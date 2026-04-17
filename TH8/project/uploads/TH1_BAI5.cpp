#include <iostream>
using namespace std;

#define MAXCOLS 100

// Ham nhap mang 2 chieu
void inputArr2D(int arr[][MAXCOLS], int m, int n) {
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            cout << "Nhap arr[" << i << "][" << j << "]: ";
            cin >> arr[i][j];
        }
    }
}

// Ham in mang 2 chieu
void printArr2D(int arr[][MAXCOLS], int m, int n) {
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++)
            cout << arr[i][j] << " ";
        cout << endl;
    }
}

// Ham cong hai mang 2 chieu
void addArr2D(int a[][MAXCOLS], int b[][MAXCOLS],
              int m, int n, int c[][MAXCOLS]) {
    for(int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            c[i][j] = a[i][j] + b[i][j];
}

// Ham tim so lon nhat va vi tri
int maxArr2D(int arr[][MAXCOLS], int m, int n,
             int &rowMax, int &colMax) {
    int max = arr[0][0];
    rowMax = 0;
    colMax = 0;

    for(int i = 0; i < m; i++)
        for(int j = 0; j < n; j++)
            if(arr[i][j] > max) {
                max = arr[i][j];
                rowMax = i;
                colMax = j;
            }
    return max;
}

// Ham nhan hai ma tran
void multiplyArr2D(int a[][MAXCOLS], int b[][MAXCOLS],
                   int m, int p, int n, int c[][MAXCOLS]) {
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            c[i][j] = 0;
            for(int k = 0; k < p; k++)
                c[i][j] += a[i][k] * b[k][j];
        }
    }
}

// Ham main
int main() {
    int m, n;
    int a[MAXCOLS][MAXCOLS];
    int b[MAXCOLS][MAXCOLS];
    int c[MAXCOLS][MAXCOLS];

    cout << "Nhap so dong m: ";
    cin >> m;
    cout << "Nhap so cot n: ";
    cin >> n;

    cout << "Nhap mang a:" << endl;
    inputArr2D(a, m, n);

    cout << "Nhap mang b:" << endl;
    inputArr2D(b, m, n);

    cout << "Mang a:" << endl;
    printArr2D(a, m, n);

    cout << "Mang b:" << endl;
    printArr2D(b, m, n);

    addArr2D(a, b, m, n, c);
    cout << "Mang c = a + b:" << endl;
    printArr2D(c, m, n);

    int rowMax, colMax;
    int maxVal = maxArr2D(a, m, n, rowMax, colMax);
    cout << "So lon nhat trong mang a: " << maxVal << endl;
    cout << "Vi tri: dong" << rowMax << ", cot" << colMax << endl;
    
    // Phan nhan ma tran
    int p;
    int x[MAXCOLS][MAXCOLS];
    int y[MAXCOLS][MAXCOLS];
    int z[MAXCOLS][MAXCOLS];

    cout << "\nNhap so cot p cua mang x (x la m x p): ";
    cin >> p;

    cout << "Nhap mang x:" << endl;
    inputArr2D(x, m, p);

    cout << "Nhap mang y (p x n):" << endl;
    inputArr2D(y, p, n);

    multiplyArr2D(x, y, m, p, n, z);
    cout << "Mang z = x * y:" << endl;
    printArr2D(z, m, n);

    return 0;
}

