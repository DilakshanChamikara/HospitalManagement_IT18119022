$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE 
$(document).on("click", "#btnSave", function(event)
{
	
// Clear alerts
$("#alertSuccess").text("");
$("#alertSuccess").hide();
$("#alertError").text("");
$("#alertError").hide();

// Form validation
	var status = validateHospitalForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

// If valid
	var type = ($("#hidHospitalIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "HospitalsAPI",
		type : type,
		data : $("#formHospital").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onHospitalSaveComplete(response.responseText, status);
		}
	});
});



function onHospitalSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divHospitalsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidHospitalIDSave").val("");
	$("#formHospital")[0].reset();
}	



//DELETE
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "HospitalsAPI",
		type : "DELETE",
		data : "hosID=" + $(this).data("hosid"),
		dataType : "text",
		complete : function(response, status) {
			onHospitalDeleteComplete(response.responseText, status);
		}
	});
});



function onHospitalDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divHospitalsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}



// UPDATE
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidHospitalIDSave").val($(this).closest("tr").find('#hidHospitalIDUpdate').val());
	$("#hosCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#hosName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#password").val($(this).closest("tr").find('td:eq(2)').text());
	$("#address").val($(this).closest("tr").find('td:eq(3)').text());
	$("#mobile").val($(this).closest("tr").find('td:eq(4)').text());
	$("#email").val($(this).closest("tr").find('td:eq(5)').text());
	$("#webAddress").val($(this).closest("tr").find('td:eq(6)').text());
});


// CLIENTMODEL
function validateHospitalForm() {

	// Code
	if ($("#hosCode").val().trim() == "") {
		return "Insert Hospital Code.";
	}
	
	// Hospital Code is numerical value
	var tmpCode = $("#hosCode").val().trim();
	if (!$.isNumeric(tmpCode)) {
		return "Insert a numerical value for Hospital Code.";
	}

	// Name
	if ($("#hosName").val().trim() == "") {
		return "Insert Hospital Name.";
	}

	// Password
	if ($("#password").val().trim() == "") {
		return "Insert Password for the account.";
	}

	// Address
	if ($("#address").val().trim() == "") {
		return "Insert Address.";
	}

	// Contact Number
	if ($("#mobile").val().trim() == "") {
		return "Insert Contact Number.";
	}

	// Contact Number is numerical value
	var tmpMobile = $("#mobile").val().trim();
	if (!$.isNumeric(tmpMobile)) {
		return "Insert a numerical value for Contact Number.";
	}

	// Email
	if ($("#email").val().trim() == "") {
		return "Insert Email.";
	}

	// Web Address
	if ($("#webAddress").val().trim() == "") {
		return "Insert Web Address.";
	}

	return true;
}
