#include <iostream>
using namespace std;

struct Node {
    string ten;
    int trang;
    Node* sau;
};

void themCuoi(Node*& dau, string ten, int trang) {
    Node* p = new Node{ten, trang, NULL};

    if (dau == NULL) dau = p;
    else {
        Node* t = dau;
        while (t->sau != NULL) t = t->sau;
        t->sau = p;
    }
}

void hienThi(Node* dau) {
    while (dau != NULL) {
        cout << dau->ten << " : " << dau->trang << " trang\n";
        dau = dau->sau;
    }
}

int dem(Node* dau) {
    int d = 0;
    while (dau != NULL) {
        if (dau->trang > 500) d++;
        dau = dau->sau;
    }
    return d;
}

int timMin(Node* dau) {
    int min = dau->trang;
    while (dau != NULL) {
        if (dau->trang < min) min = dau->trang;
        dau = dau->sau;
    }
    return min;
}

void xoaMin(Node*& dau) {
    int min = timMin(dau);

    while (dau != NULL && dau->trang == min) {
        Node* x = dau;
        dau = dau->sau;
        delete x;
    }

    Node* p = dau;
    while (p != NULL && p->sau != NULL) {
        if (p->sau->trang == min) {
            Node* x = p->sau;
            p->sau = x->sau;
            delete x;
        } else {
            p = p->sau;
        }
    }
}

int main() {
    Node* dau = NULL;

    themCuoi(dau, "Sach A", 300);
    themCuoi(dau, "Sach B", 600);
    themCuoi(dau, "Sach C", 150);
    themCuoi(dau, "Sach D", 1530);
    themCuoi(dau, "Sach E", 50);

    cout << "Danh sach ban dau:\n";
    hienThi(dau);

    string ten;
    int trang;

    cout << "\nNhap ten sach: ";
    getline(cin, ten);   

    cout << "Nhap so trang: ";
    cin >> trang;

    themCuoi(dau, ten, trang);

    cout << "\nSau khi them:\n";
    hienThi(dau);

    cout << "\nSo sach >500: " << dem(dau);

    xoaMin(dau);

    cout << "\nSau khi xoa min:\n";
    hienThi(dau);

    return 0;
}
