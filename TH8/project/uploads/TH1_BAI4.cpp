#include <iostream>
using namespace std;

// Ham nhap mang dong n so nguyen
int* inputDynamicArr(int n) {
    int* arr = new int[n];
    for(int i = 0; i < n; i++) {
        cout << "Nhap arr[" << i << "]: ";
        cin >> arr[i];
    }
    return arr;
}

// Ham in mang dong
void printDynamicArr(int* arr, int n) {
    for(int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
}

// Ham them so x vao cuoi mang
void appendDynamicArr(int* &arr, int &n, int x) {
    int* newArr = new int[n + 1];

    for(int i = 0; i < n; i++)
        newArr[i] = arr[i];

    newArr[n] = x;

    delete[] arr;
    arr = newArr;
    n++;
}

// Ham main
int main() {
    int n;
    cout << "Nhap so phan tu n: ";
    cin >> n;

    int* arr = inputDynamicArr(n);

    cout << "Mang vua nhap: ";
    printDynamicArr(arr, n);

    int x;
    cout << "Nhap so can them vao cuoi mang: ";
    cin >> x;

    appendDynamicArr(arr, n, x);

    cout << "Mang sau khi them phan tu: ";
    printDynamicArr(arr, n);

    delete[] arr;
    return 0;
}

