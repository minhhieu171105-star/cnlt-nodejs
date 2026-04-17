//https://docs.google.com/document/d/1te-5x96SVhavLE2Ijmk_pdOa4YK5pfCY/edit?usp=drive_link&ouid=112114070377075533916&rtpof=true&sd=true
#include <iostream>
#include <string>
using namespace std;

// Cau trúc Node
struct Node{
    string eng;
    string viet;
    Node* next;
};

// Cau trúc danh sách
struct List{
    Node* head;
};

// Khoi tao danh sách
void init(List &l){
    l.head = NULL;
}

// Tao node
Node* createNode(string e, string v){
    Node* p = new Node;
    p->eng = e;
    p->viet = v;
    p->next = NULL;
    return p;
}

// Thêm vào cuoi danh sách
void addLast(List &l, string e, string v){
    Node* p = createNode(e,v);

    if(l.head == NULL){
        l.head = p;
        return;
    }

    Node* temp = l.head;

    while(temp->next != NULL)
        temp = temp->next;

    temp->next = p;
}

// In danh sách
void printList(List l){
    Node* temp = l.head;

    while(temp != NULL){
        cout << temp->eng << " - " << temp->viet << endl;
        temp = temp->next;
    }
}

// Tìm tu
int searchWord(List l, string x){
    Node* temp = l.head;

    while(temp != NULL){
        if(temp->eng == x)
            return 1;

        temp = temp->next;
    }

    return 0;
}

// In tu dau den hello
void printToHello(List l){
    Node* temp = l.head;

    while(temp != NULL){
        cout << temp->eng << " - " << temp->viet << endl;

        if(temp->eng == "hello")
            break;

        temp = temp->next;
    }
}

// Xóa các tu bat dau bang c
void deleteC(List &l){

    while(l.head != NULL && l.head->eng[0] == 'c'){
        Node* temp = l.head;
        l.head = l.head->next;
        delete temp;
    }

    Node* p = l.head;

    while(p != NULL && p->next != NULL){
        if(p->next->eng[0] == 'c'){
            Node* temp = p->next;
            p->next = temp->next;
            delete temp;
        }
        else
            p = p->next;
    }
}

// Sap xep tang d?n theo tieng Anh
void sortList(List &l){
    for(Node* i = l.head; i != NULL; i = i->next){
        for(Node* j = i->next; j != NULL; j = j->next){
            if(i->eng > j->eng){
                swap(i->eng, j->eng);
                swap(i->viet, j->viet);
            }
        }
    }
}

// Chuong trình chính
int main(){

    List l;
    init(l);

    // Tao 10 tu
    addLast(l,"apple","tao");
    addLast(l,"cat","meo");
    addLast(l,"dog","cho");
    addLast(l,"hello","xin chao");
    addLast(l,"book","sach");
    addLast(l,"car","xe hoi");
    addLast(l,"school","truong hoc");
    addLast(l,"computer","may tinh");
    addLast(l,"pen","but");
    addLast(l,"student","sinh vien");

    cout<<"Danh sach tu dien:\n";
    printList(l);

    string x;
    cout<<"\nNhap tu tieng Anh can tim: ";
    cin>>x;

    if(searchWord(l,x))
        cout<<"Tim thay\n";
    else
        cout<<"Khong tim thay\n";

    cout<<"\nDanh sach tu dau den hello:\n";
    printToHello(l);

    deleteC(l);

    cout<<"\nDanh sach sau khi xoa cac tu bat dau bang c:\n";
    printList(l);

    sortList(l);

    cout<<"\nDanh sach sau khi sap xep tang dan:\n";
    printList(l);

    return 0;
}

