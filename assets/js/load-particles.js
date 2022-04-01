var xhr = new XMLHttpRequest();
xhr.onload = function()
{
	if(xhr.status === 200)
	{
		var responseObject = JSON.parse(xhr.responseText);
    	particlesJS('particles-js', responseObject);
  	}
};

xhr.open('GET', 'assets/json/spaceship.json', true);
xhr.send(null);
