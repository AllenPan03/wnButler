$(function(){

$("#doPoint table tr td span small").each(function(index){
  $(this).mouseover(function(){
    id=index+1;

	var obj=$(this).parent().parent().next().children("em");
	if(id<=5){
		//obj.html(txt1[id-1]);
	}else if(id>5 && id<=10){
	  id=id-5;
	 // obj.html(txt2[id-1]);
	}else if(id>10 && id<=15){
	  id=id-10;
	  //obj.html(txt3[id-1]);
	}
      //alert(id)
    $(this).parent().removeClass();
    $(this).parent().addClass("star"+id);
	$(this).parent().parent().next().children("strong").html(id);
  });
  var Point1=5;
  var Point2=5;
  var Point3=5;
  $(this).click(function(){
    id=index+1;
	if(id<=5){
	  $("#pointV1").val(id);
	}else if(id>5 && id<=10){
	  id=id-5;
	  $("#pointV2").val(id);
	}else if(id>10 && id<=15){
	  id=id-10;
	  $("#pointV3").val(id);
	}
	$(this).parent().attr("v",id);
    $(this).parent().removeClass();
    $(this).parent().addClass("star"+id);
	var v1=parseInt($("#item1").attr("v"));
	var v2=parseInt($("#item2").attr("v"));
	var v3=parseInt($("#item3").attr("v"));
        //alert(v2)
	//var temp_v=(v1+v2+v3)/3;
    var temp_v=v1*0.2+v2*0.5+v3*0.3
      var temp_v=  temp_v.toFixed(1)
	//var temp_v=Math.round(temp_v*Math.pow(10,1))/Math.pow(10,1);

	var num=temp_v;
	var integer=parseInt(num);
	var flt=num-integer;
	var fltln=(num.toString()).length-(integer.toString()).length-1;
	var fltint=(flt.toString()).substring(2,(fltln+2));
	var fltint=fltint > 0 ? fltint : 0;   
	
	//$("#myPoint img").attr("src","../images/star"+integer+".gif");
	$("#myPoint big").html(integer);
	$("#myPoint small").html("."+fltint);
	//$("#myPoint em").html(txt0[integer-1]);
  });
  $(this).parent().mouseout(function(){
    var ids=$(this).attr("v");
      //alert(ids)
	id=index+1;
	var obj=$(this).parent().next().children("em");
	if(id<=5){
		//obj.html(txt1[ids-1]);
	}else if(id>5 && id<=10){
	  id=id-5;
	 // obj.html(txt2[ids-1]);
	}else if(id>10 && id<=15){
	  id=id-10;
	 // obj.html(txt3[ids-1]);
	}
	$(this).parent().next().children("strong").html(ids);
    $(this).removeClass();
    $(this).addClass("star"+ids);
  });
});

});