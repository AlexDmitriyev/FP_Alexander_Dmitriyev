let fun = null
let arg1 = '0'
let arg2 = ''
        
const add = function(x) {
    return y => x + y
}        
        
const subtract = function(x) {
    return y => x - y
}        
        
const multiply = function(x) {
    return y => x * y
}                
        
const divide = function(x) {
    return y => x / y
}                       
        
const pow = function(x) {
    return y => Math.pow(x , y)
}                              
        
function operatorString(f) {
    switch (f) {
        case add: return '+';
        case subtract: return '-';
        case multiply: return '*';
        case divide: return '/';
        case pow: return '^';
    }   
            
    return '+';
}               
       
        
function onClickCalc() {
    if (!(fun===null) && arg2.length > 0 && arg2 != '-')
    {
        const sRes = '' + fun(Number(arg2))
        document.getElementById('id_input').value = sRes
        fun = null
        arg1 = sRes
        arg2 = ''
    }
}
        
function onClickPoint() {
    if (fun===null) {
    if (arg1 != '-' && arg1.indexOf('.') == -1) {
        arg1 += '.'
        document.getElementById('id_input').value += '.'
    }
    }
    else {
    if (arg2.length > 0 && arg2 != '-' && arg2.indexOf('.') == -1) {
        arg2 += '.'
        document.getElementById('id_input').value += '.'
    }          
    }
}
        
        
function onClickSqrt() {
    if (fun===null)
    arg1 = '' + Math.sqrt(arg1)
    document.getElementById('id_input').value = arg1
}
         
        
function onClickReset() {
    document.getElementById('id_input').value = '0'                        
    fun = null
    arg1 = '0'
    arg2 = ''
}
        
        
function onClickNum(num) {
let value = document.getElementById('id_input').value
if (value == 'NaN')
return
        
    if (fun === null) {
        if (arg1 == '0')
        arg1 = '' + num 
        else
        arg1 += num
                
        document.getElementById('id_input').value = arg1 
    }
    else
    {
        arg2 += num
        value += num                    
        document.getElementById('id_input').value = value             
    }
}
        
function onClick2ArgOperation(f) {
    if (arg1 == '-')
    return
            
    if (fun===null) { 				
    let value = document.getElementById('id_input').value
    if (value == '0' && f == subtract) {
        arg1 = '-'
		value = '-'
    }
    else {                 
	    fun=f(Number(arg1))
        value += operatorString(f)
	}
            
    document.getElementById('id_input').value = value
    }
    else if (f===subtract) {
    if (arg2.length == 0) {
        document.getElementById('id_input').value += '-'
        arg2 = '-'
    }            	
    }          
}                               
               
function onClickClear() {       
    let value = document.getElementById('id_input').value
    if (value == 'NaN')
	return

    if (fun===null && arg1.length > 0) {
          	
    if (arg1.length > 1) {
        arg1 = arg1.slice(0, -1)
        document.getElementById('id_input').value = value.slice(0, -1)
    }
    else {
        arg1 = '0'
        document.getElementById('id_input').value = '0'
    }
            
    }
    else if (fun!==null && arg2.length > 0) {
        if (arg1.length > 1) {
        arg2 = arg2.slice(0, -1)
        document.getElementById('id_input').value = value.slice(0, -1)           
        }
        else {
        arg2 = ''
        }
    }
}
