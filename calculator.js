var defaultAgeWarning = "";
var defaultWeightWarning = "";
var defaultCreatinineWarning = "";
var defaultResult = "";
var weightError = "Please enter a valid weight, up to 2 decimal places.", creatinineError = "Please enter a valid serum creatinine level up to 2 decimal places.";
var kg = 0, lbs = 0, micromoles_liter = 0, mg_dL = 0;
function generateError(div,errorMsg,defaultHTML) {
	div.html("<span class=\"error\">" + errorMsg + "</span> " + defaultHTML);
	$("#results").removeClass("calculated").html("Result will appear here once all errors are cleared.");
}
function calculate() {
	if ($("#age").is(":valid") && $("#age").val() != "" && $("#kg").is(":valid") && $("#kg").val() !== "" && $("#mg-dl").is(":valid") && $("#mg-dl").val() !== "") {
		$("#results").addClass("calculated").html("Creatinine clearance level: " + ((140 - Number($("#age").val()))*kg/(72*mg_dl) * ($("#male").is(":checked") ? 1 : 0.85)).toFixed(2) + " mL/min");
	}
}
function reset() {
	$("#male").prop("checked",true);
	$("input[type=text],input[type=number]").val("");
	$("#age-warning").html(defaultAgeWarning);
	$("#weight-warning").html(defaultWeightWarning);
	$("#results").removeClass("calculated").html(defaultResult);
}
$(document).ready(function() {
		defaultAgeWarning = $("#age-warning").html();
		defaultWeightWarning = $("#weight-warning").html();
		defaultCreatinineWarning = $("#creatinine-warning").html();
		defaultResult = $("#result").html();
		$("#age").change(function () {
				if ($("#age").is(":valid") && !$("#age").val() == "") {
					$("#age-warning").html("");
					calculate();
				} else
					generateError($("#age-warning"),defaultAgeWarning,"");
		});
		$("#kg").change(function() {
				if ($("#kg").is(":valid") && $("#kg").val() !== "") {
					kg = Number($("#kg").val());
					lbs = 2.20462 * kg;
					$("#lbs").val(lbs.toFixed(2));
					$("#weight-warning").html("");
					calculate();
				} else {
					$("#lbs").val("");
					generateError($("#weight-warning"),weightError,defaultWeightWarning);
				}
		});
		$("#lbs").change(function() {
				if ($("#lbs").is(":valid") && $("#lbs").val() !== "") {
					lbs = Number($("#lbs").val());
					kg = lbs/2.20462;
					$("#kg").val(kg.toFixed(2));
					$("#weight-warning").html("");
					calculate();
				} else {
					$("#kg").val("");
					generateError($("#weight-warning"),weightError,defaultWeightWarning);
				}
		});
		$("#micromoles-liter").change(function() {
				if ($("#micromoles-liter").is(":valid") && $("#micromoles-liter").val() !== "") {
					micromoles_liter = Number($("#micromoles-liter").val());
					mg_dL = micromoles_liter/88.4;
					$("#mg-dL").val(mg_dL.toFixed(2));
					$("#creatinine-warning").html("");
					calculate();
				} else {
					$("#mg-dL").val("");
					generateError($("#creatinine-warning"),creatinineError,defaultCreatinineWarning);
				}
		});
		$("#mg-dL").change(function() {
				if ($("#mg-dL").is(":valid") && $("mg-dL").val() !== "") {
					mg_dL = Number($("#mg-dL").val());
					micromoles_liter = 88.4 * mg_dL;
					$("#micromoles-liter").val(micromoles_liter.toFixed(2));
					$("#creatinine_warning").html("");
					calculate();
				} else {
					$("#micromoles-liter").val("");
					generateError($("#creatinine-warning"),creatinineError,defaultCreatinineWarning);
				}
		});
		$("#male,#female").click(calculate);
		$("#reset").click(reset);
});
					
					
					
