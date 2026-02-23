const fs = require('fs');
const path = require('path');

// Paste the raw data below (Keyword, Cluster, Search Volume - tab or 2+ spaces separated)
const raw = `business loan	Loan	49500
loans	Loan	301000
shriram finance vehicle loan details	Loan	5400
dhani loan personal	Loan	110000
nbfc loan	Loan	12100
shriram finance personal loan details	Loan	1900
loan apply	Loan	49500
shriram finance mortgage loan	Loan	1300
nbfc personal loan	Loan	6600
shriram finance vehicle loan details online	Loan	720
two wheeler loan	Loan	18100
how to calculate interest on a loan	Loan	5400
how to calculate interest rate on a loan	Loan	5400
unsecured business loans	Loan	3600
refinance car loan	Loan	3600
loan without income proof	Loan	6600
personal loan for self employed	Loan	3600
loan on mutual fund	Loan	3600
shriram city personal loan	Loan	880
loans for bad credit	Loan	5400
aadhar card loan 50000 online apply	Loan	5400
pan card loan	Loan	2900
aadhar loan	Loan	12100
how to get education loan	Loan	2900
best personal loans	Loan	3600
shriram finance personal loan interest rate	Loan	1600
best unsecured business loans	Loan	2400
loan foreclosure	Loan	2400
loan application	Loan	12100
emergency loans	Loan	9900
business loan interest rate	Loan	22200
personal loan apply online	Loan	40500
instant personal loan	Loan	90500
personal loan interest rates	Loan	90500
low credit score loans	Loan	6600
machinery loan documents	Loan	2900
small cash loan on aadhar card	Loan	3600
how to get a loan	Loan	3600
personal loans for bad credit	Loan	1900
urgent loan with bad credit in india	Loan	8100
finance loan	Loan	8100
vehicle loan interest rate	Loan	8100
shriram housing finance loan status	Loan	480
gold loan interest rate	Loan	74000
personal loan interest	Loan	4400
loan details	Loan	1900
loan against fd	Loan	8100
car loan interest rate	Loan	135000
instant loan	Loan	135000
gold loan rate today	Loan	9900
insta loan	Loan	6600
car loan interest	Loan	6600
business loan apply online	Loan	1600
my loan	Loan	1600
gold loan	Loan	60500
commercial vehicle loan	Loan	3600
personal loan maximum tenure	Loan	2400
vehicle loan interest	Loan	6600
personal loan apply	Loan	33100
personal loan without income proof	Loan	5400
gold loan rate per gram	Loan	5400
2nd hand car loan interest rate	Loan	5400
second hand car loan interest rate	Loan	5400
lowest interest rate loans	Loan	3600
personal loan bank	Loan	5400
online personal loan	Loan	12100
doctor loan	Loan	2400
bike loan interest rate	Loan	22200
loans for bad credit score	Loan	1300
overdraft loan	Loan	2900
working capital loan	Loan	2900
loan interest	Loan	3600
startup business loans	Loan	3600
shriram finance home loan interest rate	Loan	720
noc for bike loan	Loan	5400
gold loan rate per gram today	Loan	8100
aadhar card loan app	Loan	4400
small business loans	Loan	4400
instant loan on aadhar card	Loan	2400
pan card loan 50000	Loan	1300
documents required for car loan	Loan	1300
gold loan minimum amount	Loan	2900
shriram finance personal loan eligibility	Loan	590
personal loans for students	Loan	3600
shriram finance education loan	Loan	140
new business loans	Loan	1600
shriram finance personal loan status	Loan	140
pre owned car loan	Loan	1600
shriram finance loan against property	Loan	140
10 lakh loan emi for 5 years	Loan	3600
50000 loan	Loan	3600
commercial property loan interest rates	Loan	3600
documents required for personal loan	Loan	1600
how to apply for education loan	Loan	1600
cc loan full form	Loan	1600
cash credit loan	Loan	1600
bike loan	Loan	14800
sbi gold loan per gram today	Loan	2900
what is the interest rate on a personal loan	Loan	2400
50000 loan for 1 year	Loan	2400
take a loan	Loan	1900
car loan eligibility	Loan	1900
10 lakh loan	Loan	1900
30k salary home loan	Loan	720
shriram finance loan statement download	Loan	480
shriram finance personal loan app	Loan	480
shriram finance loan interest rate	Loan	480
recharge loan	Loan	720
how to apply for a personal loan	Loan	1300
adani loan details	Loan	1300
how to apply for a loan	Loan	1300
only aadhar card loan	Loan	1300
aadhar card loan	Loan	18100
1 lakh loan	Loan	3600
hdfc personal loan status	Loan	18100
what is mortgage loan	Loan	3600
gold loan per gram	Loan	18100
10000 loan	Loan	3600
shriram finance loan track	Loan	110
10000 personal loan	Loan	2900
personal loan for salaried	Loan	2900
loan agency	Loan	2900
pre approved loan	Loan	2900
msme loan interest rate	Loan	6600
adhar se loan	Loan	1300
loan against mutual fund interest rate	Loan	720
working capital loan for new business	Loan	5400
how to find interest rate on loan	Loan	880
dhani loan repayment	Loan	880
personal loan without salary slip	Loan	1900
loans for senior citizens	Loan	590
loan against gold	Loan	1900
bad credit loans in india	Loan	590
short term loans	Loan	14800
best gold loan interest rate	Loan	2400
pm aadhar card loan apply online	Loan	2900
gold loan near me	Loan	18100
moneytap loan app	Loan	2400
commercial vehicle loan interest rate	Loan	2400
loan app without pan card	Loan	1000
emergency loan on aadhar card	Loan	1000
refinance bike loan	Loan	1000
fast unsecured business loans	Loan	1000
gold loan takeover	Loan	590
aadhar card loan apply	Loan	1300
loans for unemployed	Loan	1300
shri ram city loan status	Loan	140
pre owned car loan interest rate	Loan	720
online finance loan	Loan	480
bad credit car loans	Loan	480
bad credit loans guaranteed approval	Loan	480
marriage loan calculator	Loan	480
personal loan for senior citizens	Loan	480
2nd hand car loan	Loan	880
instant loan on cibil score	Loan	880
used car loan eligibility	Loan	880
home loan interest rate	Loan	201000
two wheeler loan interest rate	Loan	12100
2 wheeler loan interest rate	Loan	2400
car loan	Loan	40500
foreclose loan means	Loan	1900
5 lakh loan emi for 5 years	Loan	1900
how to check my loan details	Loan	480
how to check my loan status	Loan	480
personal loan approval process	Loan	480
what is loan disbursement	Loan	480
personal loan for salaried employee	Loan	480
refinance home loan	Loan	480
how to take student loan	Loan	480
no credit check loans	Loan	590
loan without pan card	Loan	590
aadhar card pe loan	Loan	1300
bank loan for car	Loan	1300
emergency loans online	Loan	1300
used two wheeler loan online approval	Loan	720
second hand vehicle loan	Loan	390
loan against policy	Loan	720
without pan card loan	Loan	720
loan against two wheeler	Loan	720
shriram personal loan interest rate	Loan	260
personal loan pan card	Loan	1000
car loan for used cars	Loan	720
gst loan	Loan	1000
asirvad microfinance loan details	Loan	390
shriram finance business loan interest rates	Loan	260
best loans	Loan	1600
loan closing	Loan	1600
personal loan documents	Loan	1600
loan processing fee	Loan	1600
gold loan app	Loan	1600
cheap personal loans	Loan	1600
loans near me	Loan	1600
construction loan interest rates	Loan	1600
urgent personal loan	Loan	1900
small cash loan on aadhar card without pan card	Loan	1900
need a loan	Loan	1900
personal loan for pensioners	Loan	720
loan against property without income proof	Loan	1900
loan against property finance companies	Loan	3600
how to get loan online	Loan	1300
tvs credit mobile loan check	Loan	4400
instant personal loan online	Loan	14800
loan against stock	Loan	880
bullet repayment gold loan	Loan	390
loan against bike	Loan	880
small personal loans online	Loan	880
personal loan without bank statement	Loan	880
aadhar card pan card loan	Loan	880
pre approved car loan	Loan	880
term loan interest rates	Loan	880
demand loan	Loan	880
loan disbursement process	Loan	390
zero down payment bike loan	Loan	880
business loan for new business	Loan	880
refinance car loan interest rate	Loan	480
agri gold loan	Loan	480
ashirwad loan	Loan	320
flexi term loan	Loan	590
used car loan interest	Loan	320
aadhar cash loan review	Loan	590
two-wheeler loan rate of interest	Loan	1300
unsecured small business startup loans	Loan	320
loan with aadhar card	Loan	590
shriram finance commercial vehicle loan interest rates	Loan	210
credit builder loan	Loan	590
ltv loan calculator	Loan	320
how to personal loan apply	Loan	590
loan link	Loan	590
capital loan	Loan	1300
loans for	Loan	1000
mortgage loan	Loan	27100
used car loan interest rate	Loan	8100
5 lakh personal loan emi	Loan	1000
urgent loan for cibil defaulters	Loan	1600
loan for cibil defaulters	Loan	1000
cc loan interest rate	Loan	1600
pre approved personal loan	Loan	8100
old car loan interest rate	Loan	1300
personal loan interest rates in india	Loan	1300
lowest car loan interest rate	Loan	9900
long term loans	Loan	1300
loan against insurance policy	Loan	1300
online business loan	Loan	1300
50000 personal loan	Loan	2900
i need a loan of 50000 urgently	Loan	2900
auto loan interest rates	Loan	2900
car loan rates	Loan	2900
what is gold loan	Loan	2900
two wheeler vehicle loan	Loan	320
loan interest formula	Loan	720
loan aadhar card	Loan	720
personal loan for 15000 salary	Loan	720
used car loan rates	Loan	720
merchant loans	Loan	720
how to check bike loan status	Loan	320
home loan prepayment calculator excel	Loan	720
gold loan overdraft	Loan	320
what is part payment in loan	Loan	320
gold loan transfer	Loan	720
check car loan eligibility	Loan	720
check my loan status	Loan	880
loan age limit	Loan	880
car loan documents	Loan	1000
10000 loan without pan card	Loan	390
house loan age limit	Loan	880
aashirwad loan	Loan	390
easy approval personal loans	Loan	390
loan against life insurance policy	Loan	480
bike loan checking app	Loan	480
personal loan without pan card	Loan	480
secured personal loan	Loan	260
loan renewal	Loan	260
fast business loans	Loan	480
shriram business loan	Loan	260
loan disbursement	Loan	3600
today gold loan rate per gram	Loan	1300
maximum tenure for car loan	Loan	1300
car loan roi	Loan	1300
how to check my all loan details	Loan	2400
how do i check my loan status	Loan	480
business loan eligibility	Loan	2400
best loan provider	Loan	480
cc loan	Loan	2400
urgent cash loans	Loan	1000
loan against property documents required	Loan	880
aadhar pe loan	Loan	1000
sme loan full form	Loan	1000
post office loan interest rates	Loan	1000
zero interest loans	Loan	1000
loan sites	Loan	1000
bike mortgage loan	Loan	260
how to apply for student loan in india	Loan	260
instant loan with low cibil score	Loan	590
50000 loan emi calculator	Loan	260
how to get a loan with bad credit	Loan	260
gold loan balance transfer	Loan	260
loan approval process	Loan	260
used commercial vehicle loan	Loan	590
business finance loans	Loan	260
pf loan eligibility	Loan	260
personal business loans	Loan	590
loans for salaried employees	Loan	590
personal overdraft loan	Loan	260
15000 loan	Loan	720
student loan without pan card	Loan	320
gold loan repayment	Loan	320
loan app for students without pan card	Loan	320
personal loan salary 12000	Loan	320
personal loan process steps	Loan	320
loan against insurance	Loan	390
car loan interest rate for all banks	Loan	5400
personal loan private bank	Loan	390
bank auto loans for bad credit	Loan	210
business loan pre approval	Loan	210
how can i get a personal loan	Loan	390
car loan age limit	Loan	390
loan from aadhar card	Loan	390
cash loans	Loan	18100
pan card loan apply	Loan	210
what is the maximum loan duration for the personal loan	Loan	390
gold loan means	Loan	880
documents required for gold loan	Loan	880
gold loan meaning	Loan	880
low cibil score loan app	Loan	6600
30000 personal loan	Loan	880
loan against two wheeler rc book	Loan	880
business loan rates	Loan	880
10 lakh personal loan	Loan	880
gold loan in india	Loan	880
vehicle loan	Loan	6600
property loan eligibility	Loan	390
aadhar cash loan	Loan	1000
loan on fixed deposit	Loan	390
my loan details	Loan	1000
personal loan age limit	Loan	1000
gold loan rate	Loan	3600
kcc loan amount per acre	Loan	1000
salary based loan	Loan	1000
mudra loan procedure	Loan	1000
nbfc bank loan	Loan	390
agriculture loan maximum amount	Loan	210
50k loan instant	Loan	480
quick business loans	Loan	480
top up loan eligibility	Loan	210
gold loan processing fee	Loan	480
car loan interest rate in delhi	Loan	480
punishment for non payment of personal loan in india	Loan	480
car loan interest rate in india	Loan	1600
what is the repayment period in mudra loan	Loan	210
business loan without gst	Loan	210
best business loans	Loan	590
loan on aadhar card without pan card	Loan	260
od loan full form	Loan	590
loan for unemployed person	Loan	260
scooter loan	Loan	590
personal loan 600 credit score	Loan	260
25000 loan bad credit	Loan	260
personal loan process	Loan	590
650 credit score personal loan	Loan	260
nbfc business loan	Loan	590
loan interest rate formula	Loan	260
payday loans bad credit	Loan	260
personal loan with less interest	Loan	320
loan by aadhar card	Loan	320
shriram personal loan app	Loan	170
personal loan with less interest rate	Loan	880
bank loan	Loan	14800
instant loan without pan card	Loan	320
10 lakh home loan emi for 10 years	Loan	880
used car loans online	Loan	170
5000 loan on pan card	Loan	4400
my personal loan	Loan	320
personal loan for govt employees	Loan	720
nbfc loan eligibility	Loan	320
instant short term loan	Loan	720
belstar microfinance loan details	Loan	720
types of personal loans	Loan	720
agriculture loan	Loan	5400
agri gold loan interest rate	Loan	720
current loan	Loan	320
start up business loans	Loan	720
maximum personal loan amount	Loan	720
shriram gold loan interest rate	Loan	110
moneytap - credit cards & loan	Loan	720
how does gold loan work	Loan	720
gold loan per gram in chennai	Loan	720
paperless personal loan	Loan	720
nri personal loan	Loan	720
how to calculate personal loan interest	Loan	720
berar finance two wheeler loan statement	Loan	720
formula to calculate interest on loan	Loan	720
agriculture gold loan	Loan	720
apr loan	Loan	720
gold overdraft loan	Loan	320
agriculture loan schemes	Loan	1600
loan on fd	Loan	1600
loan without salary slip and bank statement	Loan	1600
easy personal loans	Loan	1600
gold loan process	Loan	1600
gold loan renewal	Loan	590
personal loan against agricultural land	Loan	590
self employed business loan	Loan	170
need emergency loan	Loan	170
gold loan terms and conditions	Loan	170
home loan personal loan	Loan	390
existing loan	Loan	170
loan against gold calculator	Loan	390
500000 loan	Loan	480
loan app aadhar card	Loan	390
minimum age for personal loan	Loan	170
easy business loans	Loan	170
purpose of personal loan	Loan	170
mortgage loan document list	Loan	390
commercial car loan	Loan	390
loan interest rates	Loan	6600
personal loan for cash salary person	Loan	170
car loan tenure	Loan	480
loan for business without security	Loan	170
can education loan be transferred from one bank to another	Loan	170
how to get a car loan	Loan	390
instant loan without salary slip	Loan	390
how much interest on car loan	Loan	480
business loan application	Loan	390
gold loan minimum interest rate	Loan	480
1 lakh loan for unemployed	Loan	390
personal loans for unemployed	Loan	390
personal loans no credit check	Loan	260
personal loan without credit check	Loan	260
indiabulls loan payment	Loan	140
loan on aadhar	Loan	260
how to take personal loan	Loan	720
how to take loan	Loan	1000
car loan interest rate in pune	Loan	720
refinance vehicle loan	Loan	140
loan against used car	Loan	260
loans for 600 credit score	Loan	210
auto loan refinance rates	Loan	140
without bank statement loan	Loan	140
how to check loan application status	Loan	140
best loan app without pan card	Loan	210
business loan without cibil	Loan	260
home renovation loan	Loan	3600
nbfc loan apply online	Loan	720
pan card loan online	Loan	210
vehicle loan refinance rates	Loan	140
mortgage loan documents	Loan	590
loan balance check	Loan	140
monthly loans	Loan	210
i want loan without pan card	Loan	210
personal loan eligibility	Loan	12100
shriram finance car loan interest rate	Loan	1000
doctors loan eligibility	Loan	210
car loan criteria	Loan	260
10 year personal loan	Loan	260
joint personal loans	Loan	210
second car loan interest rate	Loan	210
emi calculation formula for two wheeler loan	Loan	260
used car loan in kerala	Loan	140
which finance is best for personal loan	Loan	210
loan without mortgage	Loan	140
check loan status	Loan	1900
loan against salary	Loan	590
i need a loan urgently	Loan	590
15000 personal loan	Loan	590
working capital demand loan	Loan	260
loan number check	Loan	590
loan foreclosure charges	Loan	590
loan to value	Loan	590
business loan low interest rate	Loan	590
loan emi moratorium	Loan	590
personal loan eligibility criteria	Loan	260
how much gold loan per gram	Loan	590
repo rate impact on home loan	Loan	260
private loan company	Loan	590
top loans	Loan	590
which of the following providing loan to business	Loan	320
can we transfer education loan from one bank to another	Loan	140
balloon loan	Loan	140
personal loan without collateral	Loan	320
loans for poor credit score	Loan	140
used car loan emi per lakh	Loan	320
home loan repo rate	Loan	2400
instant loan without bank statement	Loan	140
car loan interest rate in bangalore	Loan	320
minimum gold required for gold loan	Loan	140
doctor loan eligibility	Loan	320
loan disbursement process in banks	Loan	140
two wheeler loan emi calculator excel	Loan	140
need a loan with bad credit	Loan	320
private loan against property	Loan	140
gold loan interest rate all bank	Loan	5400
low interest business loan	Loan	320
can i get loan without pan card	Loan	170
online loan without pan card	Loan	170
best personal loan without income proof	Loan	390
loan with pan card	Loan	170
how to calculate loan percentage	Loan	170
10 crore loan	Loan	170
banks that give personal loans	Loan	170
home loan for cibil score of 550	Loan	390
used car refinance loan	Loan	170
no pan card loan	Loan	170
the amount of vehicle loan is directly paid to	Loan	390
consolidation loans	Loan	390
check loan details	Loan	390
online loans near me	Loan	110
gold loan eligibility criteria	Loan	590
loans for bad credit history	Loan	110
indiabulls loan	Loan	590
small loan without salary slip	Loan	480
student loan app without pan card	Loan	480
commercial vehicle loan apply online	Loan	210
bad credit loans online	Loan	590
two wheeler loan eligibility	Loan	590
education loan interest rate in india	Loan	2900
loan for chartered accountants	Loan	480
second hand car loan interest	Loan	480
canara bank business loan	Loan	720
gold loan interest	Loan	9900
loan against fixed deposit calculator	Loan	1600
lrd loan	Loan	590
loan against car without income proof	Loan	480
loan on vehicle	Loan	210
how to get a business loan from a bank	Loan	480
gold loan documents	Loan	480
loan preclosure	Loan	210
lease rental discounting loan	Loan	590
personal loan without credit score	Loan	480
home loan tax benefit calculator 2020-21	Loan	110
loan request	Loan	210
no interest loan. in	Loan	480
average personal loan interest rate	Loan	480
small business loan requirements	Loan	590
loan against property eligibility criteria	Loan	480
loan on credit score	Loan	110
loan on aadhar card only	Loan	480
instant loan app without pan card	Loan	110
online business loan instant	Loan	480
gold loan settlement	Loan	110
online loan application	Loan	2900
how to get loan on aadhar card	Loan	590
study loan interest rate	Loan	9900
online personal loan for self employed	Loan	590
loans for government employees	Loan	480
bank loan interest	Loan	3600
loan statement download	Loan	480
car loan for second hand car	Loan	480
fund based loan	Loan	110
personal loan procedure	Loan	590
two wheeler loan interest rate calculator	Loan	480
personal loan upto 10 lakhs	Loan	210
canara bank gold loan rate	Loan	2900
50000 loan urgent	Loan	480
overdraft loan eligibility	Loan	210
loan number check online	Loan	1000
business loans for women	Loan	4400
bike loan age limit	Loan	260
types of bank loans	Loan	4400
instant loans for unemployed	Loan	210
how to apply for a business loan	Loan	720
gold loan eligibility per gram	Loan	210
mortgage loan criteria	Loan	720
small instant loans	Loan	4400
what is the interest rate on a business loan	Loan	260
vehicle loan rates	Loan	260
gold loan renewal process in sbi	Loan	210
how to business loan	Loan	260
no interest loans	Loan	720
ujjivan loan app	Loan	880
dairy farm loan	Loan	4400
car loan foreclosure	Loan	260
loan on existing car	Loan	260
cash salary personal loan	Loan	260
ev car loan	Loan	260
bank loan documents required	Loan	210
loans beauty salon	Loan	110
personal loan rates in india	Loan	320
loan against gold jewellery	Loan	480
gold loan insurance	Loan	140
loan rates	Loan	480
apply loan for new business	Loan	110
loan for govt employees	Loan	480
car mortgage loan	Loan	480
what is the interest rate on a car loan	Loan	320
gold loan renewal process	Loan	480
loan for 15000 salary	Loan	140
gold loan apply	Loan	480
bina pan card loan	Loan	140
loan for salaried person	Loan	1000
how to check loan interest rate	Loan	140
loan without pan card for students	Loan	140
small loan without pan card	Loan	140
how to raise money for a business without a loan	Loan	140
loan for retired person	Loan	110
commercial car loan interest rate	Loan	320
shriram finance two wheeler loan statement download	Loan	720
how to get personal loan online	Loan	390
how to calculate interest on loan amount	Loan	140
transfer gold loan	Loan	110
0 interest loans	Loan	1300
refinance car loan rates	Loan	140
esaf microfinance loan details	Loan	110
refinance loan	Loan	480
gold loan tenure	Loan	480
close loan account	Loan	110
education loan interest	Loan	8100
loan for bad credit score in india	Loan	140
mobile recharge loan	Loan	140
personal loans online instant approval	Loan	320
car loan balance transfer	Loan	390
truck loan interest rate	Loan	320
shriram car loan interest rate	Loan	140
online loan companies	Loan	140
unsecured loans	Loan	8100
scooty loan interest rate	Loan	480
mudra loan emi for 50000	Loan	110
personal loan minimum tenure	Loan	170
used car loan interest rate all bank	Loan	390
business capital loans	Loan	170
only pan card loan	Loan	170
defaulter of loan means	Loan	320
gst based loans	Loan	170
small loans online	Loan	2900
how to get a loan without a job	Loan	390
how to personal loan	Loan	170
the loan	Loan	390
car loan procedure	Loan	390
loans for no credit history	Loan	170
personal loan for women	Loan	1300
loan pan card	Loan	170
nbfc personal loan interest rates	Loan	170
dhani loan repayment online	Loan	170
two wheeler loan interest rate 2021	Loan	880
minimum gold loan amount	Loan	170
working capital loan interest rate	Loan	320
business loan companies	Loan	170
shop loan	Loan	880
loan money online	Loan	390
gold loan price today	Loan	1600
urgent cash loan without salary slip	Loan	1600
repo rate cut impact on home loan	Loan	880
car loan interest rates today	Loan	390
term loan repayment schedule	Loan	170
agri loan interest rate	Loan	390
personal loan aadhar card	Loan	390
personal loan duration	Loan	170
rbi guidelines on foreclosure charges on personal loan	Loan	390
loan disbursement meaning	Loan	2900
benefit loans	Loan	170
overdraft vs personal loan	Loan	260
no salary slip personal loan	Loan	170
aadhar par loan	Loan	390
loan on land documents	Loan	320
adani loan	Loan	390
zero interest personal loans	Loan	390
krishi loan interest rate	Loan	390
loan from	Loan	260
agriculture loan interest rate	Loan	3600
hdfc personal loan online payment	Loan	720
loan documents list	Loan	210
construction equipment loan interest rates	Loan	320
loan against shares	Loan	3600
minimum loan amount for personal loans	Loan	260
car loan in delhi	Loan	210
sk finance loan details	Loan	1000
best personal loan app	Loan	14800
types of loans in india	Loan	260
aadhar pan card loan	Loan	210
loan on cibil score	Loan	210
personal loan eligibility for salaried person	Loan	590
personal loan for businessman	Loan	720
motorcycle loan	Loan	210
business loan tenure	Loan	210
personal loan for private employees	Loan	260
loan against bond	Loan	210
bike loan from bank	Loan	260
loan for women	Loan	3600
i need a personal loan	Loan	260
personal loan approval	Loan	260
pan card per loan	Loan	720
best car loan interest rate india	Loan	260
personal od loan	Loan	260
loan against property without cibil	Loan	260
housing loan interest	Loan	14800
home loan interest	Loan	14800
request letter for missing gold loan receipt	Loan	260
golden loans	Loan	260
commercial shop loan interest rates	Loan	260
nbfc interest rates loans	Loan	260
how to get loan from aadhar card	Loan	260
gold loan for farmers	Loan	210
gold loan amount per gram	Loan	320
take loan online	Loan	320
demand loan meaning	Loan	320
finance loan interest rates	Loan	140
student loan transfer	Loan	140
loan against car interest rate	Loan	390
how much student loan can i get	Loan	320
two wheeler bike loan	Loan	320
personal loan personal loan	Loan	140
loan for unsalaried	Loan	320
best business loan in india	Loan	320
types of business loans in india	Loan	320
max value vehicle loan statement	Loan	140
two wheeler bike loans	Loan	320
online debt consolidation loans	Loan	720
instant personal loan for self employed	Loan	390
credit card loan vs personal loan	Loan	320
car loan information	Loan	140
two wheeler loan lowest interest	Loan	140
new car loan rates	Loan	390
repo rate for home loan	Loan	390
marriage loan	Loan	6600
50000 loan on aadhar card	Loan	110
aadhar loan apply online	Loan	720
3 lakh loan on aadhar card	Loan	320
loan on gst	Loan	140
loan for students without pan card	Loan	110
bike loan interest rate all bank	Loan	390
kotak loan app	Loan	1900
without pan card loan app	Loan	1000
used bike loan interest rate	Loan	140
rs loan	Loan	140
t permit car loan	Loan	110
rural population needs long term loan	Loan	320
small loan online without income proof	Loan	320
10 lakhs loan emi	Loan	320
online gold loan	Loan	1000
loan eligibility criteria	Loan	140
loan business loan	Loan	140
personal loan prepayment calculator india	Loan	320
lowest used car loan interest rate	Loan	320
without pan card loan apply	Loan	110
loan against property with bad cibil	Loan	1000
how to check interest rate on loan	Loan	140
dhani loan payment online	Loan	110
personal loan tenure	Loan	1000
mortgage loan process	Loan	390
bridge loan	Loan	1300
easy personal loan bank	Loan	110
home loan processing time	Loan	390
student loan on aadhar card	Loan	390
instant loan without salary slip and bank statement	Loan	110
10 lakh loan interest per month	Loan	260
used car loan documents required	Loan	320
loan percentage	Loan	390
how to find out interest rate on loan	Loan	110
what is agriculture loan	Loan	140
low emi personal loan	Loan	320
personal loan no salary	Loan	110
urgent loan for unemployed in india	Loan	320
dhani loan app	Loan	6600
minimum cibil score for loan against property	Loan	390
what is demand loan	Loan	320
no loan	Loan	140
debt consolidation loans eligibility	Loan	720
loan in aadhar card	Loan	140
self employed personal loan eligibility	Loan	140
gold loan benefits	Loan	320
jewel loan per gram	Loan	1000
personal loan all	Loan	110
personal loan for self employed in india	Loan	320
part payment personal loan	Loan	720
zero down payment two wheeler loan	Loan	140
2wheeler bike loan	Loan	320
quick unsecured business loans	Loan	140
od loan means	Loan	1000
microfinance loan details	Loan	140
online car loans	Loan	320
is loan foreclosure good or bad	Loan	110
typical car loan interest rate	Loan	320
best personal loan offers	Loan	320
how to get a vehicle loan	Loan	390
small business loan apply online	Loan	140
get loan on aadhar card	Loan	140
personal loan tenure maximum	Loan	140
car loan details	Loan	260
bank loan for business	Loan	1000
bike loan for students	Loan	140
bad credit business loans	Loan	110
gold loan maximum tenure	Loan	320
foreclosure loan meaning	Loan	390
what is education loan interest rate	Loan	390
bike loan eligibility	Loan	480
how to get loan without pan card	Loan	320
how to apply for a loan online	Loan	260
business loans for hotels	Loan	210
how can i get a loan with bad credit	Loan	110
pre owned car loan rates	Loan	140
what documents required for personal loan	Loan	320
best instant personal loan	Loan	210
loan on salary account	Loan	170
loan for petrol pump	Loan	170
100 percent home loan finance	Loan	170
no pan card loan app	Loan	170
construction equipment loan	Loan	320
emergency loan 50000	Loan	2900
shriram finance gold loan interest rates	Loan	480
2 lakh personal loan	Loan	1600
loan on agriculture land	Loan	2900
unsecured business loan for startup	Loan	170
types of loans in agriculture	Loan	170
personal loan aadhar card loan	Loan	210
unsecured business loan lenders in india	Loan	210
best personal loan in india	Loan	5400
immediate personal loan online	Loan	210
loan against property	Loan	27100
bank of baroda two wheeler loan interest rate	Loan	480
can i get a loan	Loan	170
loan against mutual funds interest rate	Loan	1600
startup business loan apply	Loan	210
what is loan against mutual funds	Loan	320
commercial construction loans	Loan	170
personal loan scheme	Loan	170
professional loan for doctors	Loan	320
loan against cheque near me	Loan	320
car loan interest rate in chennai	Loan	320
electric scooter loan interest rate	Loan	210
information on personal loans	Loan	320
pan card loan apply online	Loan	170
apply for commercial vehicle loan	Loan	170
how to check car loan eligibility	Loan	170
loan against property interest rate	Loan	12100
banks that offer personal loans	Loan	170
loan eligibility age	Loan	320
does repo rate affect personal loan	Loan	210
how to get easy loan	Loan	320
what is loan	Loan	5400
how to calculate home loan emi	Loan	2900
easy personal loans online	Loan	170
adani finance	Finance	1300
small finance bank fd rates	Finance	2900
bussan auto finance	Finance	2400
job in finance company	Finance	2400
asirvad microfinance ltd	Finance	1600
ashirwad finance	Finance	880
ashirvad finance	Finance	880
supply chain finance	Finance	2400
bike finance check online	Finance	480
finance limited	Finance	1000
bussan auto finance noc online download	Finance	1000
asirvad microfinance	Finance	9900
ashirbad finance	Finance	390
bussan auto finance noc online download pdf	Finance	720
dhani finance	Finance	14800
sreeram finance kollam	Finance	260
indiabulls housing finance limited	Finance	5400
car finance details	Finance	480
car refinance interest rates	Finance	390
finance application	Finance	390
motilal oswal home finance	Finance	1900
vehicle finance	Finance	880
two wheeler refinance near me	Finance	320
private finance company	Finance	720
used car finance rates	Finance	720
trade finance in banking	Finance	170
cars for sale finance	Finance	390
bike seized by finance	Finance	140
car refinance rates	Finance	140
margin finance	Finance	260
kotak finance	Finance	4400
finance app	Finance	5400
how to check finance on bike	Finance	170
altum credo home finance interest rate	Finance	140
bhushan auto finance	Finance	390
rc book finance	Finance	110
refinance	Finance	3600
indiabulls housing finance	Finance	5400
bussan finance	Finance	260
finance job 12th pass	Finance	320
vehicle refinance rates	Finance	140
auto refinance rates	Finance	140
gold finance company	Finance	480
old car finance interest rates	Finance	140
second hand car finance near me	Finance	170
bhushan finance	Finance	390
asirvad micro finance	Finance	390
bussan auto finance near me	Finance	210
finance collection job	Finance	260
second hand car finance interest rate	Finance	260
bridge finance is also known as	Finance	140
bike finance company	Finance	320
motor finance	Finance	320
small finance bank fd	Finance	170
bussan auto finance noc online	Finance	170
finance bill	Finance	2900
gadi finance	Finance	260
finances in marriage	Finance	110
tata finance loan status	Finance	720
bike finance age limit	Finance	260
splendor finance price	Finance	260
auto finance companies	Finance	260
vehicle finance interest rate	Finance	140
two wheeler refinance loan	Finance	140
aadhar housing finance loan statement download	Finance	720
finance online	Finance	140
two wheeler rc book finance near me	Finance	210
bajaj finance overdraft loan	Finance	260
tractor finance interest rate	Finance	170
fincare small finance	Finance	210
fd rates small finance bank	Finance	170
kotak mahindra finance	Finance	4400
mobile finance	Finance	3600
call finance	Finance	110
overdraft bajaj finance	Finance	210
mobile finance company list	Finance	170
ujjivan small finance bank loan details	Finance	1300
construction finance	Finance	390
aditya birla finance loan details	Finance	880
car finance check	Finance	210
car finance interest rates	Finance	1000
finance interest rate	Finance	390
bajaj finance office near me	Finance	18100
finance management trainee	Finance	110
finance company vacancies	Finance	170
commercial vehicle refinance	Finance	110
bank car finance	Finance	110
instant finance loans	Finance	140
bussan auto finance bangalore	Finance	110
bike finance near me	Finance	2400
srtfinance	Finance	140
how to check emi in bajaj finance app	Finance	170
4 wheeler finance company	Finance	140
fincare small finance bank balance check number	Finance	480
aye finance loan details	Finance	880
aye finance loan statement	Finance	260
online finance	Finance	480
two wheeler finance interest rate	Finance	140
finance pay	Finance	880
finance and it jobs	Finance	140
pre owned car finance rates	Finance	140
mdfc finance	Finance	170
working capital finance is raised from	Finance	320
ss finance	Finance	320
types of agriculture finance	Finance	170
e scooter finance	Finance	140
advantages of microfinance	Finance	140
commercial auto loan refinance	Finance	110
dmi finance loan status	Finance	1900
the current system of international trade and finance follows	Finance	140
finance companies in india	Finance	2400
muthoot finance bike loan interest rate	Finance	110
ifl housing finance interest rates	Finance	110
muthoot finance loan statement download	Finance	590
tvs finance office near me	Finance	1000
3 wheeler finance companies	Finance	110
loan finance companies near me	Finance	140
motilal oswal home finance limited	Finance	720
hinduja finance home loan interest rate	Finance	110
finance rates	Finance	110
what is supply chain finance	Finance	390
how to check bike finance status	Finance	110
capri finance	Finance	1300
business finance	Finance	2400
microfinance interest rates	Finance	110
gold finance rate	Finance	110
kisetsu saison finance loan app	Finance	1300
micro finance company	Finance	5400
finance meaning in tamil	Finance	5400
what is bps in finance	Finance	140
hinduja finance app	Finance	2400
finance recruitment	Finance	110
bajaj finance loan close	Finance	110
sakthi finance fd interest rates	Finance	320
bps finance	Finance	210
finance payment	Finance	880
finance card	Finance	880
mobile finance app	Finance	880
best bike finance company	Finance	110
two wheeler finance company list	Finance	210
incred finance personal loan interest rate	Finance	480
hindustan finance	Finance	480
car loan finance	Finance	880
muthoot finance mortgage loan interest rate	Finance	110
small finance bank fd interest rates	Finance	260
jobs in finance	Finance	590
how to check how many emi left in bajaj finance	Finance	110
finance bike loan	Finance	260
fincare small finance bank	Finance	33100
scooty finance	Finance	590
which finance is best for bike loan	Finance	260
sundaram finance interest rates	Finance	480
muthoot finance gold loan eligibility	Finance	140
finance related jobs for freshers	Finance	170
capital finance loan	Finance	590
kifs housing finance rate of interest	Finance	170
muthoot finance fd rates	Finance	880
bajaj finance fd rates	Finance	12100
finance department jobs	Finance	210
mahindra finance loan statement online	Finance	390
incred finance loan status	Finance	140
jana small finance bank personal loan details	Finance	210
jobs in finance field	Finance	390
ltv full form in finance	Finance	720
what is trade finance	Finance	720
fincare small finance bank fd rates	Finance	260
international trade finance iibf	Finance	390
finance blogs	Finance	1000
india bulls housing finance	Finance	320
sakthi finance fd rates	Finance	320
dhani finance loan	Finance	6600
vistaar finance loan details	Finance	320
bank financed cars for sale	Finance	140
forchun finance	Finance	110
100 car loan finance	Finance	170
refinance personal loan	Finance	140
unity small finance bank near me	Finance	2400
bajaj finance head office	Finance	1600
finance trainee	Finance	170
cagr definition finance	Finance	110
car finance percentage rate	Finance	110
auto finance companies list	Finance	110
machinery finance	Finance	320
corporate finance jobs	Finance	720
fortune finance	Finance	1000
benefits of microfinance	Finance	170
tvs finance loan details	Finance	210
small finance bank interest rates	Finance	480
best finance company for personal loan	Finance	140
unity finance bank	Finance	590
finance loan app	Finance	1600
documents required for muthoot finance gold loan	Finance	210
lcc full form in finance	Finance	260
bajaj finance od review	Finance	110
svatantra microfinance branches	Finance	320
tata finance services limited	Finance	1600
cholamandalam finance review	Finance	140
dhani finance company	Finance	320
mahindra finance rate of interest car loan	Finance	320
muthoot finance fd	Finance	320
mobile finance near me	Finance	210
mahindra finance fd rates 2022	Finance	480
private finance	Finance	1900
bajaj finance 0 down payment	Finance	170
bajaj finance card interest rate	Finance	170
supply chain finance meaning	Finance	320
bajaj finance loan account number	Finance	390
centrum housing finance rate of interest	Finance	110
pulsar 220 emi bajaj finance	Finance	140
bajaj finance insurance policy	Finance	140
finance companies in tamilnadu	Finance	110
fortuner finance	Finance	110
dmi finance loan closure	Finance	210
irr finance	Finance	1000
suryoday small finance bank group loan	Finance	210
bajaj finance complaint mail id	Finance	170
kinds of finance	Finance	170
automotive finance	Finance	140
ecl finance limited	Finance	1000
balaji finance ltd	Finance	140
how to apply bajaj finance card	Finance	1900
bajaj housing finance limited pan number	Finance	140
fincare small finance bank branches	Finance	390
sk finance car loan interest rate	Finance	140
lic housing finance home loan top up	Finance	110
mahindra finance tractor loan interest rate	Finance	170
bajaj finance meaning	Finance	140
cholamandalam finance salary	Finance	110
sk finance interest rates	Finance	170
sound finance meaning	Finance	170
sundaram finance thrissur	Finance	110
0 finance mobile	Finance	210
online mobile finance	Finance	1000
power finance corporation bonds	Finance	170
how to block bajaj finance calls	Finance	260
supply chain finance companies in india	Finance	170
bajaj finance loan eligibility	Finance	140
bajaj finance card details	Finance	1300
north east small finance bank ifsc code	Finance	480
muthoot finance gold loan interest rate 2021	Finance	1300
bajaj finance bike loan interest rate	Finance	1300
irr meaning in finance	Finance	1300
bajaj finance emi card number	Finance	110
bajaj finance complaint no	Finance	260
bajaj finance mortgage loan interest rate	Finance	110
premium finance	Finance	140
google finance formula in excel	Finance	140
power finance corporation ltd	Finance	720
bajaj finance loan against property	Finance	320
retail finance	Finance	260
hero finance share price	Finance	170
equipment finance for business	Finance	210
ujjivan small finance bank credit card	Finance	260
hinduja housing finance rate of interest	Finance	390
banking jobs for mba finance	Finance	210
finance me	Finance	140
finance collection	Finance	170
rto finance	Finance	110
cfl finance	Finance	210
micro finance business loan	Finance	110
gold loan finance company list	Finance	260
service car finance kotak	Finance	170
bajaj finance manager	Finance	140
tata housing finance home loan interest rate	Finance	110
cholamandalam finance interest rate	Finance	1300
all finance company list in india	Finance	140
financer in hindi	Finance	720
capital small finance bank fd rates	Finance	480
mahindra finance fd rates for senior citizens	Finance	170
top 5 finance companies in india	Finance	390
ev full form in finance	Finance	140
bajaj finance processing fee	Finance	390
highest fd rates in small finance bank	Finance	140
finance short form	Finance	320
chit finance	Finance	110
finance intern	Finance	390
bajaj finance advance emi payment date	Finance	170
career after mba in finance	Finance	320
finance in kannada	Finance	260
sundaram finance commercial vehicle loan interest rate	Finance	110
bajaj housing finance rate of interest	Finance	210
bajaj finance business loan interest rate	Finance	390
commercial vehicle finance	Finance	590
lic housing finance loan process	Finance	170
bps meaning finance	Finance	170
home first finance interest rates	Finance	140
bajaj finance ceo name	Finance	210
bajaj finance emi payment date	Finance	110
what is ltv in finance	Finance	140
finance tamil	Finance	590
finance bill in hindi	Finance	110
aye finance loan eligibility	Finance	110
india no 1 finance company	Finance	480
capital finance	Finance	2400
ltv finance	Finance	170
dmi finance foreclosure	Finance	320
manappuram finance gold loan rate	Finance	110
micro finance	Finance	9900
bajaj finance minimum loan amount	Finance	110
tractor loan interest rate	Tractor	1600
tractor loan	Tractor	1600
tractor meaning in tamil	Tractor	590
best selling tractor in india	Tractor	170
solar tractor	Tractor	390
five rupee note with tractor value	Tractor	170
tractor lorry	Tractor	140
loan contract	Tractor	110
5 ka note tractor wala	Tractor	260
tractor uno price	Tractor	110
tractor insurance cost	Tractor	210
tractor uno	Tractor	480
four wheel tractor price	Tractor	110
jcb tractor price in india	Tractor	260
mahindra tractor down payment price	Tractor	140
hdfc bank tractor loan interest rates	Tractor	320
top tractor in india	Tractor	320
attractive bikes	Tractor	110
most attractive bike in india	Tractor	110
closure property of subtraction	Tractor	260
tractor interest rates	Tractor	140
tractor average per km	Tractor	110
number one tractor in india	Tractor	110
eicher tractor rate	Tractor	110
tractor farm equipment	Tractor	590
tractor mileage per liter	Tractor	1000
tractor charges	Tractor	110
second hand tractor price in odisha	Tractor	140
tractor depreciation rate	Tractor	140
tractor price tamil nadu	Tractor	1000
tractor price in assam	Tractor	1300
tractor price in manipur	Tractor	110
two wheel tractor price	Tractor	170
tractor rate	Tractor	1000
top 10 tractor in india	Tractor	480
tractor average per liter	Tractor	390
tractor insurance price	Tractor	320
tractor tanker price	Tractor	110
second hand tractor under 1 lakh	Tractor	1300
two wheel tractor	Tractor	590
second hand tractor in ranchi	Tractor	140
tractor insurance 1 year price	Tractor	480
best tractor under 5 lakh	Tractor	110
kannada tractor	Tractor	110
tractor down payment	Tractor	140
tractor financing rates	Tractor	170
tractor mileage per km	Tractor	210
contractor all risk policy premium calculator	Tractor	110
agricultural tractor insurance online	Tractor	210
tractor tamil	Tractor	110
tractor under 5 lakh	Tractor	320
top 5 tractor in india	Tractor	390
tractor under 2 lakh	Tractor	170
eicher 485 tractor price in india	Tractor	140
5 rs note with tractor price	Tractor	320
top 10 tractor companies in india	Tractor	720
tractor loan for farmers	Tractor	110
tractor loan interest rate all bank	Tractor	170
car mileage calculator	Car	5400
credit card bill payment offers	Car	6600
how to calculate mileage of car	Car	2900
credit card for low cibil score	Car	2400
mobile recharge using credit card	Car	480
car average	Car	1000
car average formula	Car	1600
second hand car on emi	Car	1600
how to check credit card balance	Car	1900
zero down payment car offers 2021	Car	1300
credit card bill pay service	Car	260
check credit card balance	Car	1000
default car	Car	1000
credit card limit calculator	Car	320
how to check car mileage	Car	880
credit card bill payment due date	Car	210
down payment on a car	Car	2400
can i buy bike on credit card	Car	170
3 days grace period for credit card payment rbi	Car	320
credit score by pan card	Car	390
minimum credit score for credit card	Car	390
credit score for credit card	Car	390
pan card credit score	Car	390
how to calculate average of car	Car	3600
credit card bill payment	Car	12100
car emi interest rate	Car	880
how much down payment for car	Car	880
aadhar card lon	Car	590
credit card interest calculator per month	Car	210
0 down payment cars near me	Car	480
can we buy bike on credit card	Car	110
pay credit card bill online	Car	1000
bad credit credit cards guaranteed approval in india	Car	260
credit card bill payment services	Car	260
insurance premium payment through credit card charges	Car	110
burgman car	Car	2400
car mortgage	Car	480
low down payment cars	Car	320
credit card against mutual fund	Car	170
car credit	Car	390
credit card qualification calculator	Car	170
credit score with pan card	Car	210
can we buy bike with credit card	Car	110
fastag recharge by credit card	Car	1000
how to calculate emi for car	Car	320
hayabusa car price	Car	390
care plus	Car	1600
pay insurance with credit card	Car	260
online car application	Car	170
credit card against fd	Car	12100
fd based credit card	Car	5400
car loan requirements	Car	260
how to increase cibil score without credit card	Car	260
car loan percentage	Car	880
pan card pe loan	Car	110
what is credit card loan	Car	260
car loan emi interest rate	Car	390
swift car loan details	Car	170
fincare loan	Car	140
sun direct smart card number	Car	590
aadhar card lone	Car	140
how to find average of car	Car	260
car loans for pensioners	Car	110
car loan insurance	Car	390
cheapest car loan in india	Car	260
bajaj emi card app download	Car	480
mobile recharge by debit card	Car	260
how much credit score required for credit card	Car	260
aadhar card pan card personal loan	Car	260
activa car price	Car	590
transfer car loan to another person	Car	260
pan card score check	Car	140
how to calculate average of car in kmpl	Car	260
how to get loan for second hand car	Car	110
aadhar card online loan	Car	110
car loan documents list pdf	Car	210
car loan kerala	Car	110
check eligibility for used car loan	Car	110
sbi credit card balance check	Car	1600
car interest	Car	210
car loan down payment	Car	260
car loan rates today	Car	260
how to apply for a car loan	Car	170
aadhar card loan apply online	Car	210
credit cards for bad credit	Car	720
loan on pan card without salary slip	Car	260
1 day late credit card payment	Car	260
check credit card balance online	Car	170
get loan on car	Car	210
loan on car interest rates	Car	170
credit score required for credit card	Car	170
loan against aadhar card	Car	170
instant loan with aadhar card	Car	110
credit card minimum due calculator	Car	170
customercare chola murugappa com	Car	260
how to check average of car	Car	170
fixed deposit credit card	Car	3600
average car loan interest rate	Car	1000
loan on pan card and aadhar card	Car	140
online aadhar card loan	Car	110
aadhar card loan yojana	Car	720
car ka average kaise nikale	Car	390
0 interest car loans india	Car	170
car loan interest rate in mumbai	Car	390
minimum down payment for car	Car	1000
credit card on low cibil	Car	110
personal loan without pan card and salary slip	Car	110
best second hand car loan	Car	140
pre owned car interest rates	Car	140
what documents required for car loan	Car	140
cardless emi means	Car	210
one lakh car	Car	3600
money tap credit card	Car	210
loan for aadhar card	Car	140
best car loans for used cars	Car	140
bbps credit card	Car	140
insurance payment through credit card	Car	170
how to find the mileage of a car	Car	170
adhar card pe lone	Car	140
honda shine car	Car	320
government loan on aadhar card	Car	480
2nd car loan interest rate	Car	110
how to check icici credit card balance	Car	1000
old car interest rate	Car	140
how to get a used car loan	Car	110
loan app without aadhar card	Car	140
aadhar card loan online	Car	140
car loan companies list	Car	110
adhar card loan interest rate	Car	140
how to take loan on aadhar card	Car	110
how to calculate petrol mileage of car	Car	140
can i transfer a car loan	Car	140
pan card par loan	Car	170
car loan interest rate in kolkata	Car	140
second hand car rate of interest	Car	140
how to get a car loan for a used car	Car	110
how to calculate car mileage per litre	Car	110
kotak used car loan interest rate	Car	170
car loan eligibility for salaried	Car	110
personal loan vs credit card	Car	320
best used car loans	Car	140
without cibil credit card	Car	320
iob car loan interest rate	Car	1600
cheapest car loan interest rate	Car	880
apply for credit card with low credit score	Car	140
22 carat gold loan	Car	170
how to take car loan from bank	Car	110
passenger car meaning	Car	140
pan card pe loan kaise le	Car	110
pre owned car loan meaning	Car	110
used car loan roi	Car	110
credit card payment date	Car	110
check car loan balance	Car	110
govt loan on aadhar card	Car	390
credit card bill payment date	Car	390
loan for taxi car	Car	110
best used car loan rates	Car	110
best credit card against fd	Car	1000
10 year car loan	Car	260
fastag recharge with credit card	Car	110
car lease vs car loan	Car	110
how to find car average	Car	140
car loan without income proof	Car	390
car loan calculator formula	Car	110
60 month used car loan	Car	140
best used car rates	Car	110
personal loan aadhar card pan card	Car	110
nri car loan	Car	110
adhar card pan card loan	Car	110
adhar card pe loan	Car	140
electric car loan interest rate	Car	140
credit card rejection reasons	Car	110
adhar card per loan	Car	260
fincare	Car	27100
car loan statement	Car	320
car loan interest rate in kerala	Car	260
check car loan status	Car	140
best fd credit card	Car	2900
top up loan on existing car loan	Car	110
secured car loan	Car	390
pm aadhar card loan sbi	Car	590
tmb car loan interest rate	Car	140
pm aadhar card loan yojana 2020 online apply	Car	1900
low cibil score credit card	Car	480
bandhan bank car loan interest rate	Car	480
zero interest car loans	Car	260
car loan india	Car	590
mobile recharge atm card	Car	260
credit card payment	Car	8100
car loan interest rate in jaipur	Car	170
ram car price in india	Car	8100
passenger cars in india	Car	110
0 interest car loan	Car	260
is a car loan secured or unsecured	Car	320
car loan prepayment	Car	170
credit card payment rewards	Car	140
car loan emi per lakh	Car	320
1000 loan on aadhar card	Car	1600
1 lakh car	Car	3600
adhar card lone	Car	110
au bank car loan interest rate	Car	590
pay insurance premium with credit card	Car	110
how to pay sbi car loan emi online	Car	110
new car loan interest rate	Car	3600
aadhar card pe loan app	Car	110
aadhar card par loan	Car	1000
aadhar card se loan app	Car	390
commercial cars taxi	Car	260
best used car loan interest rates	Car	110
how much interest rate for car loan	Car	210
car loan foreclosure charges	Car	590
car loan processing fee	Car	720
car loan transfer	Car	320
credit card bill payment through credit card	Car	260
loan against aadhaar card	Car	140
passenger car vehicle	Car	320
loan aadhar card se	Car	210
top up with credit card	Car	260
what is fd credit card	Car	720
car loan all bank interest rate	Car	140
labour card loan	Car	140
credit card score check	Car	720
best credit card against fd in india	Car	1000
fincare bank balance check number	Car	210
tneb card details	Car	880
loan to buy a car	Car	110
challenger car price in india	Car	3600
how to check my credit card balance	Car	140
credit card interest rate calculator	Car	590
sbi credit card penalty charges	Car	170
credit card utilization ratio	Car	140
why my credit card application is declined	Car	170
loan on aadhar card online	Car	140
lowest car loan	Car	390
credit card bill payment by credit card	Car	110
how can i pay credit card bill with debit card	Car	110
yellow board car	Car	1600
credit card without credit score	Car	720
best used car financing	Car	140
current used car loan rates	Car	260
bank car loan interest rates	Car	1600
hdb aabhar card	Car	390
aadhar card loan app download	Car	260
car mileage per litre	Car	880
low credit score credit cards	Car	590
credit card without pan card	Car	110
credit card for low credit score in india	Car	140
car age	Car	880
personal car loans	Car	260
present car loan interest	Car	140
credit card due date	Car	480
credit card bill	Car	1600
hdfc bank car loan status	Car	320
aadhar card loan online apply	Car	210
credit card job vacancy	Car	260
credit card emi interest rate calculator	Car	110
minimum due in credit card	Car	2400
car loan top up	Car	1000
how to take loan from aadhar card	Car	140
credit card without fixed deposit	Car	880
credit rating card	Car	110
best car loans	Car	1000`;

const rows = raw.trim().split('\n').filter(Boolean).map(line => {
  const parts = line.split('\t').map(s => s.trim());
  if (parts.length >= 3) {
    return { keyword: parts[0], cluster: parts[1], searchVolume: parseInt(parts[2], 10) || 0 };
  }
  const parts2 = line.split(/\s{2,}/).map(s => s.trim());
  if (parts2.length >= 3) {
    return { keyword: parts2[0], cluster: parts2[1], searchVolume: parseInt(parts2[2], 10) || 0 };
  }
  return null;
}).filter(Boolean);

const outPath = path.join(__dirname, '..', 'src', 'data', 'keywords-cluster-keywords.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(rows));
console.log('Wrote', rows.length, 'rows to', outPath);
