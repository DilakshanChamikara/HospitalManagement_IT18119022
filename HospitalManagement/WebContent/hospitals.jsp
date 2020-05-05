<%@page import="com.Hospital"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Hospital Management</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/hospitals.js"></script>

</head>
<body>

<div class="container">
<div class="row">
<div class="col-8">

<h1>Hospital Management</h1>
<form id="formHospital" name="formHospital" method="post" action="hospitals.jsp">

Hospital code*:
<input id="hosCode" name="hosCode" type="text"
class="form-control form-control-sm">
<br>

Hospital name*:
<input id="hosName" name="hosName" type="text"
class="form-control form-control-sm">
<br>

Password*:
<input id="password" name="password" type="password"
class="form-control form-control-sm">
<br>

Address*:
<input id="address" name="address" type="text"
class="form-control form-control-sm">
<br>

Contact Number*:
<input id="mobile" name="mobile" type="text"
class="form-control form-control-sm">
<br>

Email*:
<input id="email" name="email" type="text"
class="form-control form-control-sm">
<br>

Web Address*:
<input id="webAddress" name="webAddress" type="text"
class="form-control form-control-sm">
<br>

<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
<input type="hidden" id="hidHospitalIDSave" name="hidHospitalIDSave" value="">

</form>

<div id="alertSuccess" class="alert alert-success"></div>

<div id="alertError" class="alert alert-danger"></div>
  
<br>
   
<%
	Hospital hosObj = new Hospital();
	out.print(hosObj.readHospital());
%>
      
</div>
</div>
</div>

</body>
</html>