const ids = []
ids.push("first_name", "last_name", "email", "phone", "message");

function handleSendClick() {
   let s = ''
   for (const id of ids) {
      const item = document.getElementById(id);
      if (!item.checkValidity())
         s = s + item.name + ': ' + item.validationMessage + '\n';
      else
	localStorage.setItem(id, item.value);
   }

   if (!(s === '')) 
      alert(s);
   else {

   if (document.cookie.split(';').filter((item) => item.includes('resume_contact_sent=true')).length) {
	let strMessage = '';
	let res = document.cookie.split(';');

	let fname = document.cookie.split(';').filter((item) => item.includes('resume_contact_first_name='));
	let lname = document.cookie.split(';').filter((item) => item.includes('resume_contact_last_name='));
	

	if (fname.length > 0 && lname.length > 0) {
		fname = fname[0].trim().substr('resume_contact_first_name='.length);	
		lname = lname[0].trim().substr('resume_contact_last_name='.length);
		
		if (fname === document.getElementById("first_name").value &&
	            lname === document.getElementById("last_name").value)			
		{
			strMessage = 'Thank you for your interest, ' + fname + ' ' + lname + ', your application is already beeing processed.';
			alert(strMessage);
			return;
		}
	}
   }

    document.cookie = 'resume_contact_sent = true';
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;

    document.cookie = 'resume_contact_first_name=' + first_name;
    document.cookie = 'resume_contact_last_name=' + last_name;
    document.cookie = "test1=Hello";
    
    strMessage = '' + first_name + ' ' + last_name + ',\n';
    strMessage = 'Thank you for your interest.';     
    alert(strMessage);
  }
}

window.onload = function() {

   for (const id of ids) {
      const item = document.getElementById(id);
      item.value = localStorage.getItem(id);
   }
}