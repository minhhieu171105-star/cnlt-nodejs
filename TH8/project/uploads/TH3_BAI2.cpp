#include <iostream>
#include <cmath>
using namespace std;

// node cua vector thua
struct Node{
    int index;
    double value;
    Node* next;
};

// them phan tu vao vector thua
void insert(Node** head, int index, double value){

    Node* newNode = new Node;
    newNode->index = index;
    newNode->value = value;
    newNode->next = *head;
    *head = newNode;
}

// in vector thua
void print(Node* head){

    while(head){
        cout<<"("<<head->index<<","<<head->value<<") ";
        head=head->next;
    }

    cout<<endl;
}

// cong hai vector thua
Node* add(Node* v1, Node* v2){

    Node* result=NULL;

    while(v1){
        insert(&result,v1->index,v1->value);
        v1=v1->next;
    }

    while(v2){

        Node* temp=result;
        bool found=false;

        while(temp){
            if(temp->index==v2->index){
                temp->value+=v2->value;
                found=true;
                break;
            }
            temp=temp->next;
        }

        if(!found)
            insert(&result,v2->index,v2->value);

        v2=v2->next;
    }

    return result;
}

// nhan mot so voi vector
Node* scalarMultiply(Node* v,double k){

    Node* result=NULL;

    while(v){
        insert(&result,v->index,v->value*k);
        v=v->next;
    }

    return result;
}

// tich vo huong hai vector
double dotProduct(Node* v1,Node* v2){

    double result=0;

    for(Node* p=v1;p!=NULL;p=p->next){

        for(Node* q=v2;q!=NULL;q=q->next){

            if(p->index==q->index)
                result+=p->value*q->value;
        }
    }

    return result;
}

// tinh mo dun vector
double magnitude(Node* v){

    double sum=0;

    while(v){
        sum+=v->value*v->value;
        v=v->next;
    }

    return sqrt(sum);
}

// chuyen vector thuong thanh vector thua
Node* toSparse(int a[],int n){

    Node* head=NULL;

    for(int i=0;i<n;i++){

        if(a[i]!=0)
            insert(&head,i,a[i]);
    }

    return head;
}

// chuyen vector thua thanh vector thuong
void toNormal(Node* head,int n){

    int *a=new int[n];

    for(int i=0;i<n;i++)
        a[i]=0;

    while(head){
        a[head->index]=head->value;
        head=head->next;
    }

    for(int i=0;i<n;i++)
        cout<<a[i]<<" ";

    cout<<endl;
}

int main(){

    int a[]={0,5,0,3,0,0,2};
    int b[]={1,0,4,0,0,6,0};

    Node* v1=toSparse(a,7);
    Node* v2=toSparse(b,7);

    cout<<"Vector thua 1:"<<endl;
    print(v1);

    cout<<"Vector thua 2:"<<endl;
    print(v2);

    Node* sum=add(v1,v2);
    cout<<"Tong hai vector:"<<endl;
    print(sum);

    Node* mul=scalarMultiply(v1,2);
    cout<<"Nhan vector 1 voi 2:"<<endl;
    print(mul);

    cout<<"Tich vo huong:"<<dotProduct(v1,v2)<<endl;

    cout<<"Mo dun vector 1:"<<magnitude(v1)<<endl;

    cout<<"Vector thuong tu vector thua:"<<endl;
    toNormal(v1,7);

}
