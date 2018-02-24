if(window.innerWidth<601)
{
	//javscript for mobile devices
}
if(window.innerWidth>600 && window.innerWidth<993)
{
	//javscript for tablet devices
}
if(window.innerWidth>992)
{
	/*javscript for PC and other large devices*/
}
$(document).ready(function(){
	$("#dc").height($(window).height());
	$("#dc").width($(window).width());
	$("#dc").addClass("w3-animate-top");
});