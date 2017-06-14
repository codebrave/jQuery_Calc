
$(document).ready(function() {
  
  // The inputted characters stored into memory.
  var inpt = [""];
  
  // The inputted string of characters.
  var tstr;
  
  // The arithmetic operations for comparing into
  // memory.
  var opr = ["-", "+", "*", "/"];
  
  // The decimal point in memory.
  var dec = ["."];
  
  // The numbers in memory.
  var n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // Number of total characters inputted.
  var char = 0; 
  
  // Number of total digits which is also includes
  // the '.'. A max of 8 digits can only be inputted
  // between each arithmetic operation.
  var dgs = 0;
  
  // Cursor position number
  var cr = 0; 
  
  // Calculator position number on output.
  var cp = 0;
  
  // The result of all arithmetic operations.
  var rst;
  $("#chr").html(char);
  $("#cr").html(cr);
  
  // This function gets the inputted value from
  // the calculator.
  function getV(i) {
    
    var x;

    // If i is a number or a '.' and the the number
    // of digits is less than 8, the number or 
    // decimal will be outputted.
    if ((n.indexOf(Number(i))!==-1 || i===".") && 
        dgs < 8 && cr === 0) {

      // If i is a decimal point and the number of
      // digits is not 7, this will check any '.'
      // inputted to prevent a second decimal 
      // being placed on the output.
      if (i === "."&&dgs!==7) {
 
        // Check any inputted '.' characters in 
        // a for loop until the index is 0.
        for (var l = inpt.length; l > 0; l--) {
          
          // Stop the loop if the index is a 
          // decimal point.
          if (inpt[l - 1] === ".") {
            console.log(3);
            break;
          } // end of if
          
          // Otherwise, if the index is an arithmetic
          // operation or 0, the '.' will be pushed
          // into memory.
          else if (opr.indexOf(inpt[l - 2])!==-1   
                ||(l - 1) === 0 || dgs === 0){

            char++;
            dgs++;
            inpt.push(i);
            updt();
            break;

          } // end of else if
        } // end of for
      } // end of if 
      
      // Otherwise, if i is a number, the inputted 
      // number gets pushed into memory.
      else if(n.indexOf(Number(i))!==-1){
        char++;
        dgs++;
        inpt.push(i);
        updt();
      } // end of else if  
    } // end of if 
    
    // Otherwise, if the cusor position is
    // greater than 0, the number, decimal, or
    // arithmetic operation wil be replaced with
    // i.
    else if (cr > 0) {
      x = tstr.length - 1 - cr;

      // If i is a number, then the number will be
      // inputted.
      if (n.indexOf(Number(i))!==-1) {
        x = inpt.length - 1 - cr;
        var v=0;
        var s1=0;
        
        // If index x is an arithmertic operator, then
        // this will input the number only if there are
        // less than 8 digits between the arithmetic
        // operator.
        if(opr.indexOf(inpt[x])!==-1){
 
          // Check the number of digits on the 
          // arithmetic operator's left side in a
          // for loop until another arithmetic 
          // operator is found or index is at 0.
          for(var l=1;l<10;l++) {

            // If the index is an arithmetic operator
            // or 0, v gets l. 
            if(opr.indexOf(inpt[x-l])!==-1||
              (x-l)===0){
              v=l;
              // Increment v by 1 if the index is at 0.
              if((x-l)===0){
               v++;
               s1=1;
              }
              
              break;
            }
          } // end of for
          
          // Check the number of digits on the 
          // arithmetic operator's right side in a
          // for loop until another arithmetic 
          // operator is found or index is at 
          // last postion.     
          for(var m=1;m<10;m++){
            
            // If the index is an arithmetic operator
            // or inpt.length-1, the loop stops
            // and checks if the total number of 
            // digits is less than 8.
            if(opr.indexOf(inpt[x+m])!==-1||
              (x+m)===inpt.length-1){
              
              // If the last left index checked is at 
              // 0 and the right index is the last 
              // position, m increments by 1.
              if(s1!==1&&(x+m)===inpt.length-1){
                m++;
              }

              // If the total number of characters 
              // that were checked is less than 10, i 
              // gets pushed into the memory.
              if((m+v)<10){
                inpt[x]=i;
                hltCr();
              }
              break;
            } // end of if

          } // end of for
          
        } // end of if
        
        // Otherwise, the number gets pushed into
        // memory.
        else {
        inpt[inpt.length - 1 - cr] = i;
        hltCr();
        }
      } // end of if      
      
      // Otherwise, if the cursor position is at 0 and
      // i is a '-', '-' gets pushed into memory. 
      else if(x===0&&i==="-"&&
              opr.indexOf(tstr.charAt(x+1))===-1){
        inpt[inpt.length - 1 - cr] = i;
        hltCr();
      }
      
      // Otherwise, if i is an arithmetic operator, 
      // there is no arithmetic operator or decimal 
      // next to the cursor position, and the cursor
      // position is not at 0, the arithmetic operaion
      // gets pushed into the cursor memory location. 
      else if (opr.indexOf(i)!==-1 &&
        opr.indexOf(tstr.charAt(x-1))===-1&&
        opr.indexOf(tstr.charAt(x+1))===-1&&
        tstr.charAt(x - 1) !== "."&&x!==0) {
        inpt[inpt.length - 1 - cr] = i;
        
        hltCr();
      } 
      // Otherwise, if i is a decimal point, the 
      // decimal will be placed at cursor position.
      else if (dec.indexOf(i)!==-1) {
        x = inpt.length - 1 - cr;
        y = inpt.length - cr;
        var vl=0;
        var sw=0;
        
        // If index x is an arithmertic operator, then
        // this will input the '.' only if there are
        // less than 8 digits between the arithmetic
        // operator.
        if(opr.indexOf(inpt[x])!==-1){
          
          // Check the number of digits on the 
          // arithmetic operator's left side in a
          // for loop until another arithmetic 
          // operator is found or index is at 0.
           for(var l=1;l<10;l++) {
             
            // If the index is an arithmetic operator
            // or 0, vl gets l.    
            if(opr.indexOf(inpt[x-l])!==-1||
              (x-l)===0){
              vl=l;
              
            // If x - l is 0, vl increments by 1 and
            // sw equals to 1.
              if((x-l)===0){
                vl++;
                sw=1;
              }
              break;
            }
          } // end of for
          
          // Check the number of digits on the 
          // arithmetic operator's right side in a
          // for loop until another arithmetic 
          // operator is found or index is at 
          // last position.              
          for(var m=1;m<10;m++){
            
            // If the index is an arithmetic operator
            // or inpt.length-1, the loop stops
            // and checks if the total number of 
            // digits is less than 8.
            if(opr.indexOf(inpt[x+m])!==-1||
              (x+m)===inpt.length-1){
              if(sw!==1&&(x+m)===inpt.length-1){
                m++;
              }
              // If the total number of characters 
              // that were checked is less than 10, sw 
              // equals to 2.
              if((m+vl)<10){
                sw=2;
              }
              break;
            }
          } // end of for         
        }

        // If sw is 2 or the index is a non-arithmetic
        // operator and the index next to the cursor 
        // position is also a non-arithmetic operator,
        // this will check any inputted '.' characters
        // in a loop.
        if((sw===2||opr.indexOf(inpt[x])===-1)
           &&opr.indexOf(inpt[x+1])===-1) {
          
          // Check any '.' characters on the left side
          // of cursor position.
          for (var l = x; l > 0; l--) {
            
            // Stop the loop if a decimal point is 
            // found.
            if (inpt[l-1] === ".") {
              break;
            }
            // Otherwise, if the index is an arithmetic
            // operator or at 0, sw equals to 1.
            else if (opr.includes(inpt[l-1])||
                     (l-1)===0) {

              sw=1;
              break;

            } // end of else
          } // end of for
          
          // Check any '.' characters on the right side
          // of cursor position.
          for (var m = x; m <inpt.length; m++) {
   
            // Stop the loop if a decimal point is 
            // found.            
            if (inpt[m+1] === ".") {
              break;
            } 
            
            // Otherwise, if the index is an arithmetic
            // operator or at last position and sw 
            // equals to 1, i stores to the cursor 
            // memory location.
            else if ((opr.indexOf(inpt[m+1])!==-1
                    ||m===(inpt.length-1))&&
                    sw===1) {
              inpt[x]=i;
              hltCr();
              break;

            } // end of else
          } // end of for
        } // end of if
      } // end of else if
    } // end of else if 
    
    // Otherwise, if the i is an arithmetic 
    // operator, the index at last position is a 
    // non-arithmetic operator or non-decimal, and the 
    // total number of characters is 0, i gets pushed
    // into memory.
    else if (opr.indexOf(i)!==-1 &&
      opr.indexOf(inpt[inpt.length - 1])===-1 &&
      char !== 0 && inpt[inpt.length - 1] !== ".") {

      inpt.push(i);
      dgs = 0;
      char++;
      updt();

    } // end of else if
    
    $("#chr").html(char);
    
  } // end of getV function

  // This function will update the tstr string
  // of inputted characters and the highlighted
  // cursor position.
  function updt() {
    tstr = inpt.join("");
    hltCr();

  }

  // This function will update the total result of
  // all the arithmetic operations.
  function tot() {
    tstr = inpt.join("");
    
    // If eval(tstr) is not undefined, the result
    // gets updated.
    if (eval(tstr) !== undefined) {
      cr=0;
      cp=0;
      rst = Math.round(eval(tstr) * 100) / 100;
      inpt = [""];
      inpt.push(rst);
      tstr = inpt.join("");
      inpt.pop();

      for(var j=0;j<tstr.length;j++){
        inpt.push(tstr.charAt(j));
      }

      // If the result gets divided by 0, the 
      // result is emptied.
      if(tstr=="NaN"||tstr=="Infinity"){
        inpt=[""];
        char=0;
        rst=0;
        dgs=0;
        inpt=[""];
        
        // Display "NaN" is tstr is "NaN" (0/0).
        if(tstr=="NaN"){
          $("#stp").html("<span> NaN</span");
        } // end of if
        
        // Otherwise, display "Infinity" if tstr is
        // "Infinity" ((n>0)/0).
        else if(tstr==="Infinity"){
          $("#stp").html("<span> Infinity</span");        
        } // end of else if
        
        $("#chr").html(char);
        $("#cr").html(cr);
        
      } // end of if
      
      // Otherwise if there are less than 9 characters,
      // the result gets updated.
      else if(tstr.length<9){
        char=tstr.length;
        dgs=char;
        hltCr();
        $("#chr").html(char);
        $("#cr").html(cr);
      } // end of else if
      
      // Otherwise, the result gets emptied due to 
      // having a result of more than 8 characters.
      else {
        char=0;
        rst=0;
        dgs=0;
        inpt=[""];
        $("#stp").html("<span id='h'> 0</span>"+"<span> Over Limit!</span");
        $("#chr").html(char);
        $("#cr").html(cr);
      } // end of else
      
    } // end of if
  } // end of tot function

  // This function updates the cursor position
  // whenever "<" or ">" gets pressed.
  function movCr(d) {
    
    // If d is "<", cr gets incremented by 1.
    if (d === "<") {
      cr++;
    } 
    
    // If d is "<", cr gets decremented by 1.
    else if (d === ">") {
      cr--;

    }

    var x = tstr.length - 1 - cr;
    var y = tstr.length - cr;
    var mx = tstr.length - 1 - 15;
  
    // If char is greater than 16, cr is greater than
    // 15, and cp equals to 15, the characters move 
    // to right once and the cp position stays at
    // 15.
    if (char > 16 && cr > 15 && cp === 15) {
    
      $("#stp").html("<span id='h'>" + tstr.charAt(x) + "</span>" +
        tstr.slice(y, y + 15));
    } // end of if

    // If the total number of characters is greater 
    // than 16, then the cursor moves at the position 
    // of cp. A max of 16 characters is displayed while
    // the cursor moves to its position.
    else if (char > 16) {
      mx = x - (15 - cp);
      $("#stp").html(tstr.slice(mx, x) + "<span id='h'>" 
        + tstr.charAt(x) + "</span>" +
        tstr.slice(y, y + cp));
    } // end of else if
    
    // Otherwise, the rest of the characters will be
    // displayed on the output with the cursor 
    // position.
    else {
      $("#stp").html(tstr.slice(0, x) + "<span id='h'>" 
      + tstr.charAt(x) + "</span>" 
      + tstr.slice(y, tstr.length));
    } // end of else
    
    // If the cursor position is at 0 and the last
    // position is a non-arithmetic operator, dgs
    // gets updated.
    if(cr===0&&opr.indexOf(tstr.charAt(x))===-1){
    x=inpt.length - 1;
      
      // Check on left side of the last index until
      // an arithmetic operator is found or index is 
      // 0.
      for(var l=1;l<9;l++){
       
        // If the index is an arithmetic operator or
        // 0, dgs gets l. 
        if(opr.indexOf(inpt[x-l])!==-1||
           (x-l)===0)
        {
          dgs=l;
          break;
        } // end of if
      } // end of for
    } // end of if
  } // end of movCr function

  // This function highlights at the current cursor
  // position on the calculator output.
  function hltCr() {
    tstr = inpt.join("");
    var x = tstr.length - 1 - cr;
    var y = tstr.length - cr;
    var mx;
    
    // If char is greater than 16, the cursor position
    // gets highlighted at position cp. A max of 16 
    // characters are being displayed.
    if (char > 16) {
      mx = x - (15 - cp);
      $("#stp").html(tstr.slice(mx, x) + "<span id='h'>" 
        + tstr.charAt(x) + "</span>" +
        tstr.slice(y, y + cp));
    } // end of if 
    
    // Otherwise, the rest of characters are displayed
    // (less than 17) while the current cursor position
    // gets highlighted.
    else {
      $("#stp").html(tstr.slice(0, x) + "<span id='h'>" 
       + tstr.charAt(x) + "</span>" 
       + tstr.slice(y, tstr.length));
    } // end of else
  } // end of hltCr function
  
  // This function activates when a button is pressed.
  $("a").on("click", function() {
    
    // If the button is "AC", then all characters are
    // deleted.
    if (this.id === "clrAll") {
      inpt = [""];
      dgs = 0;
      char = 0;
      cr=0;
      cp=0;
      updt();
      $("#stp").html("<span id='h'> 0 </span>");
      $("#chr").html(char);
      $("#cr").html(cr);

    } 
    // If the button is "CE", then a characters gets
    // deleted at the cursor position.
    else if (this.id === "dlt") {
      var  x;
      
      // If cr is greater than 0, the character gets
      // deleted at the cursor position.
      if (cr > 0) {
        x = inpt.length - 1 - cr;
        var v=0;
        var s2=0;
        
        // If the cursor index is an arithmetic 
        // operator, this will check the number of
        // digits between the operator is less than
        // 9.
        if(opr.indexOf(inpt[x])!==-1){
          
          // Check the number of digits on the 
          // arithmetic operator's left side in a
          // for loop until another arithmetic 
          // operator is found or index is at 0.
          for(var l=1;l<8;l++) {
            
            // If the index is an arithmetic operator
            // or 0, v gets l.               
            if(opr.indexOf(inpt[x-l])!==-1||
              (x-l)===0){
              v=l;
              
              // If the index is at 0, v increments by
              // 1 and s2 equals to 1.
              if(x-l===0){
                v++;
                s2=1;
              } // end of if
              break;
            } // end of if
          } // end of for
          
          // Check the number of digits on the 
          // arithmetic operator's right side in a
          // for loop until another arithmetic 
          // operator is found or index is at 
          // last postion.             
          for(var m=1;m<8;m++){
            
            // If the index is an arithmetic operator
            // or inpt.length-1, the loop stops
            // and checks if the total number of 
            // digits is less than 8.            
            if(opr.indexOf(inpt[x+m])!==-1||
              (x+m)===inpt.length-1){
              
              // If the index is at last position and
              // s2 is not 1, m increments by 1.
              if((x+m)===inpt.length-1&&s2!==1){
                m++;
              } // end of if 
       
              // If the total number of characters 
              // that were checked is less than 11, 
              // the character gets deleted at the
              // cursor position.
              if((m+v)<11){
                inpt.splice(x, 1);
                cr--;
                cp--;
                hltCr();
        
                // If char is not 0, char decrements
                // by 1.
                if (char !== 0) {
                  char--;
                } // end of if 
                
              } // end of if
              break;
            } // end of if
          } // end of for
       
        } // end of if 
        
        // Otherwise, the character gets deleted at
        // the cursor position.
        else {
          inpt.splice(inpt.length - 1 - cr, 1);
          cr--;
          cp--;
          hltCr(); 
          
          // If char is not 0, char decrements by 1.
          if (char !== 0) {
            char--;
          } // end of if             
        } // end of else
        
        // If cr is less than 8 and dgs, and dgs is
        // greater than 0, dgs decrements by 1.
        if(cr<8&&cr<dgs&&dgs>0){
          dgs--;
        } // end of if

        // If cr is 0, this will update dgs.
        if(cr===0){
          // Keep incrementing l in a for loop
          // until the index is an arithmetic operator
          // or 0.
          for(var l=1;l<9;l++){
            // If the index is an arithmetic operator
            // or 0, dgs gets l.
            if(opr.indexOf(inpt[x-l])!==-1||
               (x-l)===0)
            {
              dgs=l;
              break;
            } // end of if
          } // end of for
        } // end of if
        
      } // end of if
      
      // Otherwise, delete a character at the last 
      // index position.
      else {
        x = inpt.length - 1;

        // If dgs is not 0, dgs decrements by 1.
        if (dgs !== 0) {
          dgs--;
        } // end of if

        // If the last index position is an arithmetic
        // operator, then dgs gets updated.
        if(opr.indexOf(inpt[inpt.length-1])!==-1){
           // Keep incrmenting j in a for loop
           // until an arithmetic operator is found or
           // index is 0.
           for(var j=1;j<10;j++){
            
            // If the index is an arithmetic operator
            // or 0, dgs gets j and decrements by 1.
            if(opr.indexOf(inpt[x-j])!==-1||
               (x-j)===0)
            {
              dgs=j;
              dgs--;
              break;
            } // end of if
          } // end of for  
 
        } // end of if
        
        // Remove the character at last index position.
        inpt.pop();        
        updt();
        if (char !== 0) {
          char--;
        } // end of if       
      } // end of else

      $("#chr").html(char);
      $("#cr").html(cr);
    } // end of else if
    
    // If the button is "<", the cursor moves to the
    // left by 1 postion.
    else if (this.id === "<") {
      // If char is greater than 0 and cr is not at
      // last index position, the cursor moves to the
      // left.
      if (char > 0 && cr !== tstr.length - 1) {
        
        // If cp is less than 15, cp increments by 1.
        if (cp < 15) {
          cp++;
        } // end of if
        movCr(this.id);
        $("#cr").html(cr);
      } // end of if
    } // end of else if

    // If the button is ">", the cursor moves to the
    // right by 1 postion.    
    else if (this.id === ">") {
      
      // If char is greater than 0 and cr is not 0,
      // the cursor moves to the right.
      if (char > 0 && cr !== 0) {
        
        // If cp is greater than 0, cp decrements by 1.
        if (cp > 0) {
          cp--;
        } // end of if
        movCr(this.id);
        $("#cr").html(cr);

      } // end of if
    } // end of else if 
    
    // If the button is "=", then the result
    // gets displayed.
    else if (this.id === "tot") {
      tot();
    } // end of else if 
    // Otherwise, display the inputted character.
    else {
      // If char is less than 50, the inputted 
      // character gets displayed.
      if (char<50){
      getV(this.id);
      } // end of if
    } // end of else

  }); // enf of $("a") function
}); // end of $(document).ready