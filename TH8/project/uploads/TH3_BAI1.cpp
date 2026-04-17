#include <iostream>
#include <cmath>
using namespace std;

// cau truc node cua da thuc
struct Node{
    int coefficient; // he so
    int exponent;    // so mu
    Node* next;
};

// them hang tu vao dau da thuc
void insert(Node** head, int coef, int expo){
    Node* newNode = new Node;
    newNode->coefficient = coef;
    newNode->exponent = expo;
    newNode->next = *head;
    *head = newNode;
}

// in da thuc
void print(Node* head){
    cout << "Da thuc: ";
    while(head != NULL){
        if(head->coefficient >= 0)
            cout << "+" << head->coefficient;
        else
            cout << head->coefficient;

        cout << "x^" << head->exponent << " ";
        head = head->next;
    }
    cout << endl;
}

// tinh gia tri da thuc tai x
double evaluate(Node* head, double x){
    double result = 0;

    while(head != NULL){
        result += head->coefficient * pow(x, head->exponent);
        head = head->next;
    }

    return result;
}

// them node vao sau mot node
Node* insertNext(Node* node, int coef, int expo){
    Node* newNode = new Node;
    newNode->coefficient = coef;
    newNode->exponent = expo;
    newNode->next = NULL;

    if(node)
        node->next = newNode;

    return newNode;
}

// cong hai da thuc
Node* add(Node* poly1, Node* poly2){

    Node *result = NULL, *last = NULL;

    while(poly1 && poly2){

        if(poly1->exponent > poly2->exponent){
            last = insertNext(last, poly1->coefficient, poly1->exponent);
            poly1 = poly1->next;
        }

        else if(poly2->exponent > poly1->exponent){
            last = insertNext(last, poly2->coefficient, poly2->exponent);
            poly2 = poly2->next;
        }

        else{
            int coef = poly1->coefficient + poly2->coefficient;

            if(coef != 0)
                last = insertNext(last, coef, poly1->exponent);

            poly1 = poly1->next;
            poly2 = poly2->next;
        }

        if(!result)
            result = last;
    }

    while(poly1){
        last = insertNext(last, poly1->coefficient, poly1->exponent);
        poly1 = poly1->next;
    }

    while(poly2){
        last = insertNext(last, poly2->coefficient, poly2->exponent);
        poly2 = poly2->next;
    }

    return result;
}

// tinh dao ham bac 1 cua da thuc
Node* derivative(Node* poly){

    Node* result = NULL;
    Node* last = NULL;

    while(poly != NULL){

        if(poly->exponent > 0){

            int coef = poly->coefficient * poly->exponent;
            int expo = poly->exponent - 1;

            last = insertNext(last, coef, expo);

            if(!result)
                result = last;
        }

        poly = poly->next;
    }

    return result;
}

// cap nhat hang tu khi nhan da thuc
void addTerm(Node** head, int coef, int expo){

    Node* temp = *head;
    Node* prev = NULL;

    while(temp && temp->exponent > expo){
        prev = temp;
        temp = temp->next;
    }

    if(temp && temp->exponent == expo){
        temp->coefficient += coef;
    }
    else{

        Node* newNode = new Node;
        newNode->coefficient = coef;
        newNode->exponent = expo;
        newNode->next = temp;

        if(prev == NULL)
            *head = newNode;
        else
            prev->next = newNode;
    }
}

// nhan hai da thuc
Node* multiply(Node* poly1, Node* poly2){

    Node* result = NULL;

    for(Node* p = poly1; p != NULL; p = p->next){

        for(Node* q = poly2; q != NULL; q = q->next){

            int coef = p->coefficient * q->coefficient;
            int expo = p->exponent + q->exponent;

            addTerm(&result, coef, expo);
        }
    }

    return result;
}

int main(){

    // tao da thuc P(x)
    Node* poly1 = NULL;
    insert(&poly1,7,0);
    insert(&poly1,6,3);
    insert(&poly1,5,4);

    // tao da thuc Q(x)
    Node* poly2 = NULL;
    insert(&poly2,3,1);
    insert(&poly2,-7,2);
    insert(&poly2,2,3);

    // in hai da thuc
    print(poly1);
    print(poly2);

    // tinh P(2)
    cout<<"Gia tri P(2) = "<<evaluate(poly1,2)<<endl;

    // cong hai da thuc
    Node* R = add(poly1,poly2);
    cout<<"R = P + Q"<<endl;
    print(R);

    // dao ham cua Q
    Node* D = derivative(poly2);
    cout<<"Dao ham cua Q"<<endl;
    print(D);

    // nhan hai da thuc
    Node* M = multiply(poly1,poly2);
    cout<<"M = P * Q"<<endl;
    print(M);

    return 0;
}
