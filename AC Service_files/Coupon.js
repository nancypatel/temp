var temp_check="0";function fetch_couponcode(userid,sessid,isonload){var removecouponcode="0";var orderType="normal";var couponid="";if(isonload==""){if($("#txtcouponcode").val()==""){alert("Enter Coupon Code");return false;}
couponid=$("#txtcouponcode").val();}
else{if(localStorage.getItem("CouponDetail")!=null){var coupon_arr=localStorage.getItem("CouponDetail").split('_');if(coupon_arr!=""&&coupon_arr!=null){couponid=coupon_arr[0];}}
else{return false;}}
$("#hdntotalamount").val($("#txtTotalAmount").text());$("#hdncityname").val("Delhi");var amount=$("#hdntotalamount").val();var cityname=$("#hdncityname").val();$.ajax({type:"POST",contentType:"application/json; charset=utf-8",url:"ServiceBooking.aspx/getCouponDetail",data:"{'buyerid':'"+userid+"','couponid':'"+couponid+"','total_amount':'"+amount+"','cityname':'"+cityname+"','servicetype':'"+orderType+"','sessionid':'"+sessid+"'}",dataType:"json",success:function(data){debugger
var data_msg=data.d.split('_');console.log(data_msg);var showlimit="0";var sentence=data_msg[0];var upperlimit=data_msg[1];var paymanttype=data_msg[2];console.log(data_msg[1]);if(sentence.indexOf("Limit")!=-1){showlimit="1";}
if(data_msg[0].indexOf("one")!=-1){var currency=$("#hd_curency").val();var tmpval=data_msg[0].split(",");var limit=tmpval[1];removecouponcode="1";if(parseInt($("#txt_amount").val())==tmpval[2]){alert("Coupon code applicable on Rs "+limit+" shopping only");removecoupon_auto(removecouponcode);return false;}
else{var msg="coupon code applicable on "+data_msg[2]+" products  on orders above "+$("#hd_curency").val()+" "+limit+"";alert(msg);removecoupon_auto(removecouponcode);return false;}}
if(data_msg[0]=="Invalid Coupon code"||data_msg[0]=="Discount amount can not be greater than total amount"||data_msg[0]=="Coupon code is expire"||showlimit=="1"){removecouponcode="1";$("#hdnfinalamount").val($("#hdntotalamount").val());$("#hdncouponcodeamount").val("0");if(data_msg[0]=="Coupon code is expire"){alert("The coupon code you are using has expired")}
if(data_msg[0]=="Discount amount can not be greater than total amount"){alert("The coupon code is applicable on the promoted brand above a specific order value.")}
if(data_msg[0]=="Invalid Coupon code"){alert(data_msg[1]);}
if(showlimit=="1"){var value=data_msg[0].replace("Limit of discount is","");alert("Coupon code applicable on Rs "+value+" shopping only");}
removecoupon_auto(removecouponcode);}
else{var dis_amounts=0.00;dis_amounts=parseFloat(data_msg[1]);if(data_msg[0]=="Valid Coupon Code"){if(temp_check=="0"){if(dis_amounts!=0){$("#btnRemovecoupon").show();$("#btncouponapply").hide();$("#hdnfinalamount").val("");var tot=Number($("#hdntotalamount").val())-Number(dis_amounts);tot=tot.toFixed(2);var aftertax=((Number($("#hdntotalamount").val())-Number(dis_amounts))/(100+Number($("#hdntax").val()))*$("#hdntax").val());aftertax=aftertax.toFixed(2);var tmt=(tot-Number(aftertax));tmt=tmt.toFixed(2);$("#lbltotalamount").text(tmt);var totalamount=(Number(tot));totalamount=totalamount.toFixed(2);var specldisct=$("#hdnspecialdiscount").val();$("#lbltaxamount").text(aftertax);$("#txtTotalAmount").text("");$("#txtTotalAmount").text(Math.round(totalamount));$("#hdnpayableamount").val(Math.round(totalamount));$("#txtDiscountAmount").text("");$("#txtDiscountAmount").text(dis_amounts+parseInt(specldisct));if(dis_amounts>=1000){$('#divMemberPack').hide();$("#txtPackageDetail").html("");$("#txtPackageDetail").html("<b><span style=\"color: #f34686\">Congratulations… you got the best possible discount.</span></b>");$('#divPackage').show();}
$("#hdnSpclDiscCartid").val("");$("#hdnfinalamount").val(tot);$("#hdncouponcodeid").val(couponid);localStorage.setItem("CouponDetail",couponid+"_"+dis_amounts);}
else{if(localStorage.getItem("CouponDetail")!=undefined){localStorage.removeItem("CouponDetail");}
$("#btnRemovecoupon").hide();$("#btncouponapply").show();}}}
$("#divCouponApplied").show();localStorage.setItem("coupon","1");if(dis_amounts==0){$("#divCouponApplied").hide();}}},error:function(data){}});}
function removecoupon_auto(removecouponcode){if(removecouponcode=="1"){remove_couponcode();$("#hdn_couponcode").val("");$("#txtcouponcode").val("");localStorage.setItem("coupon","0");}}
function remove_couponcode(){if(temp_check!=1){}
var stt="../CouponCode/remove_coupondetails.ashx?userid="+$("#txt_custid").val();console.log(stt);$.ajax({url:"../CouponCode/remove_coupondetails.ashx?userid="+$("#txt_custid").val(),type:"POST",success:function(data){$("#btnRemovecoupon").hide();$("#btncouponapply").show();$("#spntotalamount").text($("#hdntotalamount").val());$("#divCouponApplied").hide();$("#txtcouponcode").val("");$("#hdncouponcodeid").val("");$("#hdncouponcodeamount").val("0");$("#txtPackageDetail").html("");$('#divPackage').hide();GetCartItem();if(localStorage.getItem("CouponDetail")!=undefined){localStorage.removeItem("CouponDetail");}},error:function(data){}});}
function apply_coupon_auto(){$(document).ready(function(){var strr=$("#hdn_couponcode").val();if($("#hdn_couponcode").val()!=""&&$("#hdn_couponcode").val()!=undefined){temp_check="1";$("#txtcouponcode").val($("#hdn_couponcode").val());$("#fetchcouponcode").click();}});}
function callcouponcode(){var checkPackage=MemberPackageCheck();var offerapplied=checkinclsoffer();if(checkPackage=="0"&&offerapplied=="offer"){$("#txtcouponcode").val("");alert("Discount offer already applied");return false;}
else if(checkPackage=="0"&&$("#hdnDiscountAmount").val()=="0"){var userid=document.getElementById("txt_custid").value;var sessid=document.getElementById("txt_lclstrg").value;if(userid!=""&&userid!=null&&userid!=undefined){sessid="";}
else{userid="";}
fetch_couponcode(userid,sessid,"");}
else{document.getElementById("txtcouponcode").value="";alert("Hi, You have Lifeasy Membership & Membership discount applied succesfully.");}}
function MemberPackageCheck(){var userid=$("#txt_custid").val();var check="0";if(userid!=""&&userid!=null&&userid!=undefined){$.ajax({type:"POST",contentType:"application/json; charset=utf-8",url:"ServiceBooking.aspx/MemberPackageCheck",data:"{ userid:'"+userid+"'}",dataType:"json",async:false,success:function(data){check=data.d;},error:function(result){}});}
return check;}
function checkinclsoffer(){var check="";$.ajax({type:"POST",contentType:"application/json; charset=utf-8",url:"ServiceBooking.aspx/checkinclsoffer",data:"{}",dataType:"json",async:false,success:function(data){check=data.d;},error:function(result){}});return check;}