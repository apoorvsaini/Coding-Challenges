#include <stdio.h>      /* printf, fgets */
#include <stdlib.h>     /* atoi */

int main ()
{
  int i;
  char buffer[256];
  i = atoi ("123.2323");
  printf ("The value entered is %d. Its double is %d.\n",i,i*2);
  return 0;
}