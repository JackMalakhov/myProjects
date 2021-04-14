
function group(){
    let numberOfSteps = +document.getElementById('numberOfSteps').value;
    let maxLengthOfSteps = +document.getElementById('maxLenthSteps').value;
    let pointOfScreen = +document.getElementById('pointOfScreen').value;
    let variations = [];
    let groupsList = [];
    let groupTrajectories=[];
    let pqSumm;
    let pqDifference;
    let howMuchTimes = 0;
    let tragectories=0;
    let denominator=1;
    let factorialN = factorial(numberOfSteps);
    let lengthOfString = 0;
    
    // if(numberOfSteps>1){
    for (let i=0;i<maxLengthOfSteps*2; i++){
        variations[i]=0;
        
        //howMuchTimes+=Math.floor(numberOfSteps/2)*Math.pow(numberOfSteps,i)
        howMuchTimes+=numberOfSteps*Math.pow(numberOfSteps,i)
    }

    for (let i=0; i<=howMuchTimes; ++i){
        variations[0]+=1;
        recursionIF(0);
        results();
    }

    let p = document.getElementById("numberOfGroups");
    let q = document.getElementById("tragectories");
    let gl = document.getElementById("groupList");
    p.innerHTML=groupsList.length;
    q.innerHTML=variations;
    gl.innerHTML="";
    for(let i=0; i<groupsList.length; i++){
        gl.innerHTML+=groupsList[i]+':('+groupTrajectories[i]+')' +" ";
        tragectories+=groupTrajectories[i];

        if(lengthOfString<(groupsList[i]+':('+groupTrajectories[i]+')' +" ").length){
            lengthOfString=(groupsList[i]+':('+groupTrajectories[i]+')' +" ").length;   
        }  
    }
    document.getElementById("groupList").cols=+lengthOfString;
    document.getElementById("groupList").rows=groupsList.length; 
    q.innerHTML=tragectories;

    //Вычисление знаменателя
    function denominatorCalculating(){
        let denominatorFunc=1;
    for(i=0; i<variations.length; i++){
        denominatorFunc*=factorial(variations[i]);
    }
    return denominatorFunc;
    }
    //проверка и результаты
    function results(){
        pqSumm = listSumm(variations);
        pqDifference = ListDifference(variations);
        if(pqSumm==numberOfSteps && pqDifference==pointOfScreen ){
            groupsList.push(variations.join(','));
            denominator = denominatorCalculating()*numberOfSteps/Math.abs(pointOfScreen);
            groupTrajectories.push(Math.round(factorialN/denominator)); //math.random нужна для устранения накопленной ошибки вычислений.
        }
    }

    //факториал
    function factorial(number, fIteration=1) {
        factorialNumber=fIteration;
        if (number > 1) {
            factorialNumber *= number;
            factorial(number - 1, factorialNumber);
        }
        return factorialNumber;
    }

   //вычитание суммированных p и q
   function ListDifference(list){
       let halfSumm = 0;
       let p = 0;
       let q = 0;
    for(i=0; i<maxLengthOfSteps;i++){
        q+=(i+1)*list[i];
        p+=(i+1)*list[maxLengthOfSteps+i];   
    }
        return halfSumm=p-q;
   }

    //суммирование массива
    function listSumm(list){
        let summ = 0;
        for (let i=0; i<list.length; i++){
            summ+=list[i];
        }
        return summ;    
    };

    //проверка переходов между десятками
    function recursionIF(number){
        let k = number;
        if (variations[k]==numberOfSteps+1){
            variations[k]=0;
            variations[k+1]+=1;
            if(k<variations.length) {
                recursionIF(k+1);
            }
        }
    }
    
}


