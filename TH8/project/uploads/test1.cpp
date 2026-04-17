#include <iostream>
#include <string>
using namespace std;

// cau truc node
struct Node {
    string tenSach;
    int soTrang;
    Node* next;
};

// tao node moi
Node* taoNode(string ten, int trang) {
    Node* p = new Node;
    p->tenSach = ten;
    p->soTrang = trang;
    p->next = NULL;
    return p;
}

// them sach vao cuoi danh sach
void themCuoi(Node*& head, string ten, int trang) {
    Node* p = taoNode(ten, trang);

    if (head == NULL) {
        head = p;
        return;
    }

    Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }

    temp->next = p;
}

// in danh sach sach
void inDanhSach(Node* head) {
    Node* temp = head;

    cout << "\nDanh sach sach:\n";

    while (temp != NULL) {
        cout << "Ten sach: " << temp->tenSach << endl;
        cout << "So trang: " << temp->soTrang << endl;
        cout << "------------------" << endl;

        temp = temp->next;
    }
}

// dem sach co so trang > 500
int demSach500(Node* head) {
    int dem = 0;
    Node* temp = head;

    while (temp != NULL) {
        if (temp->soTrang > 500)
            dem++;

        temp = temp->next;
    }

    return dem;
}

// tim so trang nho nhat
int timMin(Node* head) {
    int min = head->soTrang;
    Node* temp = head;

    while (temp != NULL) {
        if (temp->soTrang < min)
            min = temp->soTrang;

        temp = temp->next;
    }

    return min;
}

// xoa cac sach co so trang nho nhat
void xoaSachMin(Node*& head) {
    if (head == NULL) return;

    int min = timMin(head);

    // xoa o dau danh sach
    while (head != NULL && head->soTrang == min) {
        Node* x = head;
        head = head->next;
        delete x;
    }

    Node* temp = head;

    while (temp != NULL && temp->next != NULL) {
        if (temp->next->soTrang == min) {
            Node* x = temp->next;
            temp->next = x->next;
            delete x;
        }
        else {
            temp = temp->next;
        }
    }
}

// chuong trinh chinh
int main() {
    Node* head = NULL;
    string ten;
    int trang;

    cout << "Nhap 5 cuon sach\n";

    for (int i = 0; i < 5; i++) {
        cin.ignore();
        cout << "Nhap ten sach: ";
        getline(cin, ten);

        cout << "Nhap so trang: ";
        cin >> trang;

        themCuoi(head, ten, trang);
    }

    // in danh sach
    inDanhSach(head);

    // dem sach > 500 trang
    int kq = demSach500(head);
    cout << "\nSo sach co hon 500 trang: " << kq << endl;

    // xoa sach co so trang nho nhat
    xoaSachMin(head);

    cout << "\nDanh sach sau khi xoa sach co so trang nho nhat:\n";
    inDanhSach(head);

    return 0;
}
