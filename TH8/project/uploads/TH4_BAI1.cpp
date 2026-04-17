#include <iostream>
#include <stack>
#include <queue>

using namespace std;


// lay phan tu thu k cua queue
int layPhanTuThuK(queue<int> &q, int k)
{
    int n = q.size();
    int x, kq;

    for(int i = 1; i <= n; i++)
    {
        x = q.front();
        q.pop(); // lay phan tu dau

        if(i == k)
            kq = x; // neu dung vi tri k thi luu

        q.push(x); // dua lai vao queue
    }

    return kq;
}


// dao nguoc queue
void daoNguocQueue(queue<int> &q)
{
    stack<int> s;

    while(!q.empty())
    {
        s.push(q.front());
        q.pop(); // dua vao stack
    }

    while(!s.empty())
    {
        q.push(s.top());
        s.pop(); // dua nguoc lai queue
    }
}


// chen phan tu vao vi tri k cua stack
void chenVaoViTriK(stack<int> &s, int x, int k)
{
    stack<int> temp;

    for(int i = 1; i < k; i++)
    {
        temp.push(s.top());
        s.pop(); // dua sang stack phu
    }

    s.push(x); // chen phan tu moi

    while(!temp.empty())
    {
        s.push(temp.top());
        temp.pop(); // dua lai stack cu
    }
}


// tim gia tri nho nhat trong stack
int timMin(stack<int> s)
{
    int min = s.top();
    s.pop();

    while(!s.empty())
    {
        if(s.top() < min)
            min = s.top(); // cap nhat gia tri min

        s.pop();
    }

    return min;
}



int main()
{
    queue<int> q;
    stack<int> s;

    int n, x, k;

    // ===== NHAP QUEUE =====

    cout<<"Nhap so phan tu cua queue: ";
    cin>>n;

    cout<<"Nhap cac phan tu queue: ";

    for(int i=0;i<n;i++)
    {
        cin>>x;
        q.push(x); // them vao queue
    }

    cout<<"Nhap k de lay phan tu thu k: ";
    cin>>k;

    cout<<"Phan tu thu "<<k<<" cua queue la: ";
    cout<<layPhanTuThuK(q,k)<<endl;


    // ===== DAO NGUOC QUEUE =====

    daoNguocQueue(q);

    cout<<"Queue sau khi dao nguoc: ";

    while(!q.empty())
    {
        cout<<q.front()<<" ";
        q.pop();
    }

    cout<<endl;


    // ===== NHAP STACK =====

    cout<<"Nhap so phan tu cua stack: ";
    cin>>n;

    cout<<"Nhap cac phan tu stack: ";

    for(int i=0;i<n;i++)
    {
        cin>>x;
        s.push(x); // them vao stack
    }

    cout<<"Nhap gia tri can chen: ";
    cin>>x;

    cout<<"Nhap vi tri k: ";
    cin>>k;

    chenVaoViTriK(s,x,k);


    cout<<"Gia tri nho nhat trong stack: ";
    cout<<timMin(s)<<endl;

}
