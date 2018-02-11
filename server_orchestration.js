//rules can be written in config, we will read it and initialize as a global variable here
var rules = [{"server": "A","dependent_on": ["C","B"]},{"server": "B","dependent_on": ["C"]},{"server": "C","dependent_on": ['E']},{"server": "D","dependent_on":  []},{"server": "E","dependent_on": []}];

//this map represents the state of the instances. False means Off and True is On
var instanceStatus = {'A': false,'B': false,'C': false, 'D': false, 'E': false};

//it will store the instances which are not independent and can be spawned initially in any order
var spawnSequence = [];
var depenedencies = {};

//read the rules and spawn the clusters
function initClusters() {
  //re-hash the rules
  reHash();
  for (var k in rules) {
    var instanceName = rules[k]['server'];
    if ((rules[k]['dependent_on']).length == 0) {
      spawnSequence.push(instanceName);
    }
  }
  spawnCluster(spawnSequence);
}

function spawnCluster(spawnList) {
  var unSequenced = [];
  var visited = [];
  if (spawnList.length == 0) {
    //no independent node found, throw an error
    console.log("Can not spawn the cluster");
    return false
  }
  else {
    //add remaining instances to spawnSequence
    for (var j in rules) {
      var instanceName = rules[j]['server'];
      var dependencies = rules[j]['dependent_on'];
      //add in spanSequence only if it has not been added before
      if(spawnSequence.indexOf(instanceName) == -1) {
        //check if all dependent servers are already in the spawnSequence
        var dependencyCheck = true;
        for (var key in dependencies) {
          if(spawnSequence.indexOf(dependencies[key]) == -1) {
            dependencyCheck = false;
            visited.push(dependencies[key]);
          }
        }
        if(dependencyCheck == false) {
          unSequenced.push(instanceName);
        }
        else {
          spawnSequence.push(instanceName);
        }
      }
    }

    //check if instancs are remaining and recursively iterate on them
    if(unSequenced.length > 0) {
      var cyclic = true;
      for (var i in spawnSequence) {
        if (visited.indexOf(spawnSequence[i]) != -1) {
          cyclic = false;
          break;
        }
      }
      if(cyclic == false) {
        spawnCluster(unSequenced)
      }
      else {
        console.log("Can not spawn the cluster");
        return false
      }
    }
    else {
      //all done
      console.log("Instances will spawn in this sequence : "+spawnSequence);
      //start the instances
      for (var i in spawnSequence) {
        var instanceName = spawnSequence[i];
        if(instanceStatus[instanceName] == false) {
          instanceStatus[instanceName] = true; //start the instance
        }
      }
      return spawnSequence;
    }
  }
}

function handleDown(instance) {
  //check if other instances are dependent on it
  var tempSequence = spawnSequence.slice();
  var reSpawn = false;
  var index = spawnSequence.indexOf(instance);
  if (index == spawnSequence.length-1) {
    //if it last in the sequence, other instances are not dependant on it
    instanceStatus[instance] = true;
    console.log(instance+" is up");
    return true;
  }
  else {
    //check if next instances in spawnSequence is dependant on this one
    var nextInstance = spawnSequence[index + 1];
    var downInstances = [];
    var terminationIndex = index;
    for (var key = index + 1; key <= spawnSequence.length-1; key++) {
      var name = spawnSequence[key];
      if ((depenedencies[name]).indexOf(instance) != -1) {
        //downInstances.push(name);
        nextInstance = name;
        terminationIndex = key;
        break;
      }
    }
    if(index != terminationIndex){
      for (var k in spawnSequence) {
            //next instance is dependent on this instance
            tempSequence = tempSequence.slice(terminationIndex,(spawnSequence.length)+1); //remove all other instances from the sequence
            //terminate the dependant instances
            for (var k in tempSequence) {
              if(tempSequence[k] != instance) {
                console.log("Terminating instance "+ tempSequence[k]);
                instanceStatus[tempSequence[k]] = false;
              }
            }

            //re-spawn the instances
            for (var i = 0; i <= spawnSequence.length-1; i++) {
              if (instanceStatus[spawnSequence[i]] == false) {
                instanceStatus[spawnSequence[i]] = true;
                console.log(spawnSequence[i]+" is up");
              }
            }
            break;
      }
    }
    else {
      //next instance is not dependent on this instance and hence the rest of the instances are not dependent too
      instanceStatus[instance] = true;
      console.log(instance+" is up");
    }
  }
}


function reHash() {
  //store dependencies in separate hash
  for (var key in rules) {
    depenedencies[rules[key]['server']] = rules[key]['dependent_on'];
  }
}


//-------------------------------------Functions and calls for testing---------------------------------
//function to shutdown an Instance
function shutDown(instance) {
  //change status
  console.log(instance+" is Down");
  instanceStatus[instance] = false;
  handleDown(instance);
}

initClusters(); //start the Clusters
shutDown("D"); //shutDown an instance