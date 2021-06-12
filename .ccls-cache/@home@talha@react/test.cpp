#include <iostream>
#include <cmath>
#include <unordered_map>
using namespace std;

int sumDigitsSquared(int n){
    int sum = 0;
    while( n > 0 ){
        sum += pow(n%10, 2);
        n = n /10;
    }
    return sum;
}
bool isHappy(int n){
    unordered_map<int,int> seen;
    int temp;
    while(seen.count(n) == 0){
        cout <<" n" <<  n << endl;
        if(n == 1){ cout << "n is 1 " << endl; return true;}
        seen[n] = n;
        n = sumDigitsSquared(n);
    }
    return n;
}
int main(int argc, char *argv[]) {
   cout << ( isHappy(19) ? "yes" : "no" );
    return 0;
}
