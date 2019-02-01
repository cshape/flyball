<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Randm Flickr Pickr</title>
<link href="js/jquery-ui.min.css" rel="stylesheet">
<link href="js/jquery-ui.structure.min.css" rel="stylesheet">
<link href="js/jquery-ui.theme.min.css" rel="stylesheet">
<!--<link href="css/showDesc.css" rel="stylesheet" id="descText">-->
<link href="css/large.css" rel="stylesheet" id="imageDisplaySize">
<style>
	body, html
	{
		margin: 0;
		padding: 0;
		height: 100%;
	}
	#pageTitle
	{
		padding: 0 15px;
	}
	.sectionLabel, #searchConfigShowHide, #displayConfigShowHide, #clearImages, #getImages, #addlInfoShowHide, #downloadImages
	{
		display: block;
		background: linear-gradient(#eeeeee, #dddddd);
		padding: 10px;
		color: #000000;
		text-decoration: none;
	}
	.sectionLabel
	{
		padding-left: 20px;
	}
	#clearImages, #downloadImages
	{
		background: linear-gradient(#dddddd, #cccccc);
		font-weight: bold;
	}
	#searchConfigShowHide, #displayConfigShowHide, #addlInfoShowHide
	{
		background: linear-gradient(#cccccc, #bbbbbb);
		font-weight: bold;
	}
	#getImages
	{
		background: linear-gradient(#bbbbbb, #aaaaaa);
		font-weight: bold;
		font-size: 2em;
	}
	.sectionContent
	{
		padding: 10px 10px 10px 20px;
	}
	.upArrow, .downArrow
	{
		display: inline;
		float: right;
	}
	#imageHolder
	{
		padding: 135px 0;
	}
	.singleImageHolder img
	{
		width: auto;
		height: auto;
		display: inline-block;
	}
	#sizeChooser .sectionContent div
	{
		padding: 3px 0;
	}
	#textTagBox
	{
		margin: 0 0 5px 0;
	}
	.colorBoxCheck
	{
		display: none;
	}
	.colorBoxEmpty
	{
		display: none;
	}
	.checked .colorBoxCheck
	{
		display: inline-block;
	}
	.unchecked .colorBoxEmpty
	{
		display: inline-block;
	}
	.colorLink
	{
		border: 1px solid #000000;
		height: 20px;
		width: 20px;
		display: inline-block;
		text-decoration: none;
		margin-right: 10px;
		text-align: center;
		line-height: 20px;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12pt;
		font-weight: bold;
		color: #000000;
		margin-bottom: 10px;
	}
	#palePinkLink
	{
		background-color: #ff9f9c;
	}
	#pinkLink
	{
		background-color: #f52394;
	}
	#redLink
	{
		background-color: #ff2000;
	}
	#darkOrangeLink
	{
		background-color: #a24615;
	}
	#orangeLink
	{
		background-color: #ff7c00;
	}
	#lemonYellowLink
	{
		background-color: #fffa00;
	}
	#schoolBusYellowLink
	{
		background-color: #ffcf00;
	}
	#greenLink
	{
		background-color: #90e200;
	}
	#darkLimeGreenLink
	{
		background-color: #00ab00;
	}
	#cyanLink
	{
		background-color: #00b2d4;
	}
	#blueLink
	{
		background-color: #0062c6;
	}
	#violetLink
	{
		background-color: #8c20ba;
	}
	#whiteLink
	{
		background-color: #ffffff;
	}
	#grayLink
	{
		background-color: #7c7c7c;
	}
	#blackLink
	{
		background-color: #000000;
		color: #ffffff;
	}
	.group:after, .sectionLabel:after
	{
		content: "";
		display: table;
		clear: both;
	}
	#searchConfigShowHide, #displayConfigShowHide, #addlInfoShowHide
	{
		display: block;
	}
	#searchConfigOptions, #displayConfigOptions, #addlInfoContent
	{
		display: none;
	}
	#addlInfoContent
	{
		padding: 0 15px;
	}
	#searchConfigOptions.expanded, #displayConfigOptions.expanded, #addlInfoContent.expanded
	{
		display: block;
	}
	#col1, #col2, #buttonsRight
	{
		width: 100%;
		float: none;
		height: auto;
		overflow: visible;
		position: relative;
	}
	@media screen and (min-width: 600px)
	{
		.singleImageHolder
		{
			display: inline-block;
			vertical-align: top;
			margin: 20px;
		}
		.singleImageHolder > a
		{
			display: inline-block;
		}
		#colHolder
		{
			display: block;
			background: #ffffff;
			width: 100%;
		}
		#col1
		{
			float: left;
			width: 20%;
			height: 100vh;
			overflow: auto;
			position: fixed;
		}
		#col2
		{
			float: left;
			width: 80%;
			margin-left: 20%;
		}
		#generateForm
		{
			padding-bottom: 20px;
		}
		#buttonsRight
		{
			position: fixed;
			width: 100%;
		}
	}
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/js.cookie.js"></script>
<script language="javascript" type="text/javascript">
	var displayedImages = [];
	var currentQueryIds = [];
	var numImages = 0;
	var startingNumImages = 0;
	var imagesReturned = 0;

	var flickrAPIKey = "d61091b4772d0e40c3743b6a5fc54084";
	var itemsPerPage = 100;
	var licenseList;
	var selectedLicenses = [];
	var selectedColors = [];
	var selectedStyles = [];
	var selectedOrientations = [];
	var flickrOrigin = 1076371200; // Tuesday, February 10, 2004 12:00:00 AM
	var timeDifferenceMS = 2*60*60*1000; // this is 2 hours
	var timeDifference = timeDifferenceMS/1000;
	var colorKey = [
		["b", "Pale Pink", "#ff9f9c"], 
		["a", "Pink", "#f52394"], 
		["0", "Red", "#ff2000"], 
		["1", "Dark Orange", "#a24615"], 
		["2", "Orange", "#ff7c00"], 
		["4", "Lemon Yellow", "#fffa00"],
		["3", "School Bus Yellow", "#ffcf00"],
		["5", "Green", "#90e200"],
		["6", "Dark Lime Green", "#00ab00"],
		["7", "Cyan", "#00b2d4"],
		["8", "Blue", "#0062c6"],
		["9", "Violet", "#8c20ba"],
		["c", "White", "#ffffff"],
		["d", "Gray", "#7c7c7c"],
		["e", "Black", "#000000"]
	];
	var styleKey = [
		["blackandwhite", "Black and White"],
		["depthoffield", "Depth of Field"],
		["minimalism", "Minimalism"],
		["pattern", "Pattern"]
	];

	function supportsHtml5Storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	function getColorNameByFlickrId(flickrId)
	{
		for(var i = 0; i < colorKey.length; i++)
		{
			if(colorKey[i][0] == flickrId.toString())
			{
				return colorKey[i][1];
			}
		}
		return null;
	}
	
	function getStyleNameByFlickrText(text)
	{
		for(var i = 0; i < styleKey.length; i++)
		{
			if(styleKey[i][0] == text)
			{
				return styleKey[i][1];
			}
		}
		return null;
	}
	
	function toggleColorLink(colorLink)
	{
		if($(colorLink).hasClass("checked"))
		{
			$(colorLink).removeClass("checked");
			$(colorLink).addClass("unchecked");
		}
		else
		{
			$(colorLink).removeClass("unchecked");
			$(colorLink).addClass("checked");
		}
	}
	
	function dateToString(date)
	{
		var dateString = "";
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		dateString += months[date.getMonth()] + " ";
		dateString += date.getDate() + ", ";
		dateString += date.getFullYear() + " ";
		if(date.getHours() < 10)
		{
			dateString += "0";
		}
		dateString += date.getHours() + ":";
		if(date.getMinutes() < 10)
		{
			dateString += "0";
		}
		dateString += date.getMinutes() + ":";
		if(date.getSeconds() < 10)
		{
			dateString += "0";
		}
		dateString += date.getSeconds();
		return dateString;
	}
	
	function setSectionExpandCookies()
	{
		Cookies.set("licenseExpand", $('#licenseSection .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("safeExpand", $('#safeSearch .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("dateExpand", $('#dateTypeChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("textExpand", $('#textTagChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("colorExpand", $('#colorChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("styleExpand", $('#styleChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("oriExpand", $('#orientationChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("sizeExpand", $('#sizeChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("mediaExpand", $('#mediaTypeChooser .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("displaySizeExpand", $('#imageSize .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("selectionTypeExpand", $('#selectionType .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("imageNumbersExpand", $('#imageNumbers .sectionContent').is(':visible'), {expires: 365});
		Cookies.set("searchConfigExpand", $('#searchConfigOptions').hasClass("expanded"), {expires: 365});
		Cookies.set("displayConfigExpand", $('#displayConfigOptions').hasClass("expanded"), {expires: 365});
		Cookies.set("useridExpand", $('#useridChooser .sectionContent').is(':visible'), {expires: 365});
	}
	
	function getSectionExpandCookies()
	{
		var cookie = Cookies.get("licenseExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#licenseSection .sectionContent").hide();
			$("#licenseSection .upArrow, #licenseSection .downArrow").toggle();
		}
		cookie = Cookies.get("safeExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#safeSearch .sectionContent").hide();
			$("#safeSearch .upArrow, #safeSearch .downArrow").toggle();
		}
		cookie = Cookies.get("dateExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#dateTypeChooser .sectionContent").hide();
			$("#dateTypeChooser .upArrow, #dateTypeChooser .downArrow").toggle();
		}
		cookie = Cookies.get("textExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#textTagChooser .sectionContent").hide();
			$("#textTagChooser .upArrow, #textTagChooser .downArrow").toggle();
		}
		cookie = Cookies.get("useridExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#useridChooser .sectionContent").hide();
			$("#useridChooser .upArrow, #useridChooser .downArrow").toggle();
		}
		cookie = Cookies.get("colorExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#colorChooser .sectionContent").hide();
			$("#colorChooser .upArrow, #colorChooser .downArrow").toggle();
		}
		cookie = Cookies.get("styleExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#styleChooser .sectionContent").hide();
			$("#styleChooser .upArrow, #styleChooser .downArrow").toggle();
		}
		cookie = Cookies.get("oriExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#orientationChooser .sectionContent").hide();
			$("#orientationChooser .upArrow, #orientationChooser .downArrow").toggle();
		}
		cookie = Cookies.get("sizeExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#sizeChooser .sectionContent").hide();
			$("#sizeChooser .upArrow, #sizeChooser .downArrow").toggle();
		}
		cookie = Cookies.get("mediaExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#mediaTypeChooser .sectionContent").hide();
			$("#mediaTypeChooser .upArrow, #mediaTypeChooser .downArrow").toggle();
		}
		cookie = Cookies.get("displaySizeExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#imageSize .sectionContent").hide();
			$("#imageSize .upArrow, #imageSize .downArrow").toggle();
		}
		cookie = Cookies.get("selectionTypeExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#selectionType .sectionContent").hide();
			$("#selectionType .upArrow, #selectionType .downArrow").toggle();
		}
		cookie = Cookies.get("imageNumbersExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#imageNumbers .sectionContent").hide();
			$("#imageNumbers .upArrow, #imageNumbers .downArrow").toggle();
		}
		cookie = Cookies.get("searchConfigExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#searchConfigOptions").removeClass("expanded");
			$("#searchConfigShowHide .upArrow, #searchConfigShowHide .downArrow").toggle();
		}
		cookie = Cookies.get("displayConfigExpand");
		if(typeof cookie != "undefined" && cookie != "" && cookie != "true")
		{
			$("#displayConfigOptions").removeClass("expanded");
			$("#displayConfigShowHide .upArrow, #displayConfigShowHide .downArrow").toggle();
		}
	}

	function getTextCookie()
	{
		var cookie = Cookies.get("textSearch");
		if(typeof cookie != "undefined" && cookie != "")
		{
			$("#textTagBox").val(cookie);
		}
	}
	
	function setTextCookie()
	{
		if($("#textTagBox").val() == "")
		{
			Cookies.remove("textSearch");
		}
		else
		{
			Cookies.set("textSearch", $('#textTagBox').val(), {expires: 365});
		}
	}
	
	function getUseridCookie()
	{
		var cookie = Cookies.get("useridSearch");
		if(typeof cookie != "undefined" && cookie != "")
		{
			$("#useridBox").val(cookie);
		}
	}
	
	function setUseridCookie()
	{
		if($("#useridBox").val() == "")
		{
			Cookies.remove("useridSearch");
		}
		else
		{
			Cookies.set("useridSearch", $('#useridBox').val(), {expires: 365});
		}
	}
	
	function getMinWidthCookie()
	{
		var cookie = Cookies.get("minWidth");
		if(typeof cookie != "undefined" && cookie != "")
		{
			$("#size-width").val(cookie);
		}
	}
	
	function setMinWidthCookie()
	{
		if($("#size-width").val() == "")
		{
			Cookies.remove("minWidth");
		}
		else
		{
			Cookies.set("minWidth", $('#size-width').val(), {expires: 365});
		}
	}
	
	function getMinHeightCookie()
	{
		var cookie = Cookies.get("minHeight");
		if(typeof cookie != "undefined" && cookie != "")
		{
			$("#size-height").val(cookie);
		}
	}
	
	function setMinHeightCookie()
	{
		if($("#size-height").val() == "")
		{
			Cookies.remove("minHeight");
		}
		else
		{
			Cookies.set("minHeight", $('#size-height').val(), {expires: 365});
		}
	}

	function getColorSearchCookie()
	{
		var cookie = Cookies.get("colors");
		if(typeof cookie != "undefined" && cookie != "")
		{
			selectedColors = cookie.split(",");
			$('.colorLink').each(function()
			{
				if(selectedColors.indexOf($(this).attr("data-flickr-id")) > -1)
				{
					$(this).removeClass("unchecked");
					$(this).addClass("checked");
				}
			});
		}
	}
	
	function setColorSearchCookie()
	{
		Cookies.set("colors", selectedColors.join(), {expires: 365});
	}

	function getStyleSearchCookie()
	{
		var cookie = Cookies.get("styles");
		if(typeof cookie != "undefined" && cookie != "")
		{
			selectedStyles = cookie.split(",");

			for(var i = 0; i < selectedStyles.length; i++)
			{
				var checkBox = document.getElementById("style-" + selectedStyles[i]);
				checkBox.checked = true;
			}
		}
	}
	
	function setStyleSearchCookie()
	{
		Cookies.set("styles", selectedStyles.join(), {expires: 365});
	}

/*	function getDescTextCookie()
	{
		var cookie = Cookies.get("descText");
		if(typeof cookie != "undefined" && cookie != "")
		{
			switch(cookie)
			{
				case "hide":
				{
					$("#hideAllDescriptionText").click();
					break;
				}
				case "show":
				{
					$("#showAllDescriptionText").click();
					break;
				}
			}
		}
	}
	
	function setDescTextCookie(show)
	{
		if(show)
		{
			Cookies.set("descText", "show", {expires: 365});
		}
		else
		{
			Cookies.set("descText", "hide", {expires: 365});
		}
	}*/

	function getDisplaySizeCookie()
	{
		var cookie = Cookies.get("displaySize");
		if(typeof cookie != "undefined" && cookie != "")
		{
			switch(cookie)
			{
				case "large":
				{
					$("#largeDisplaySize").click();
					break;
				}
				case "medium":
				{
					$("#mediumDisplaySize").click();
					break;
				}
				case "small":
				{
					$("#smallDisplaySize").click();
					break;
				}
			}
		}
	}
	
	function setDisplaySizeCookie(size)
	{
		Cookies.set("displaySize", size, {expires: 365});
	}

	function getLicenseCookies()
	{
		var cookie = Cookies.get("licenses");
		if(typeof cookie != "undefined" && cookie != "")
		{
			cookie = cookie.split(",");
			for(var i = 0; i < cookie.length; i++)
			{
				var checkBox = document.getElementById("license-" + cookie[i]);
				checkBox.checked = true;
			}
		}
		else
		{
			$('.checkboxCell input').each(function()
			{
				this.checked = true;
			});
		}
	}
	
	function setLicenseCookies()
	{
		if(selectedLicenses.length == 0)
		{
			Cookies.remove("licenses");
		}
		else
		{
			Cookies.set("licenses", selectedLicenses.join(), {expires: 365});
		}
	}

	function getOrientationCookie()
	{
		var cookie = Cookies.get("orientation");
		if(typeof cookie != "undefined" && cookie != "")
		{
			cookie = cookie.split(",");
			for(var i = 0; i < cookie.length; i++)
			{
				var checkBox = document.getElementById("ori-" + cookie[i]);
				checkBox.checked = true;
			}
		}
		else
		{
			$('#orientationChooser input').each(function()
			{
				this.checked = true;
			});
		}
	}
	
	function setOrientationCookie()
	{
		if(selectedOrientations.length == 0)
		{
			Cookies.remove("orientation");
		}
		else
		{
			Cookies.set("orientation", selectedOrientations.join(), {expires: 365});
		}
	}

	function getNumberCookies()
	{
		var cookie = Cookies.get("selectionType");
		if(typeof cookie != "undefined")
		{
			$('#selectRandom, #selectFirst').prop("checked", false);
			switch(cookie)
			{
				case "random":
					$('#selectRandom').prop("checked", true);
					break;
				case "first":
					$('#selectFirst').prop("checked", true);
					break;
			}
		}
		cookie = Cookies.get("numImagesToGet");
		if(typeof cookie != "undefined")
		{
			$('#num1, #num10, #numX').prop("checked", false);
			switch(cookie)
			{
				case "1":
					$('#num1').prop("checked", true);
					break;
				case "10":
					$('#num10').prop("checked", true);
					break;
				case "X":
					$('#numX').prop("checked", true);
					break;
			}
		}
		cookie = Cookies.get("numImagesBox");
		if(typeof cookie != "undefined")
		{
			$('#numImagesBox').val(cookie);
		}
	}
	
	function setNumberCookies()
	{
		if($('#numImagesBox').val() == "")
		{
			Cookies.remove("numImagesBox");
		}
		else
		{
			Cookies.set("numImagesBox", $('#numImagesBox').val(), {expires: 365});
		}
		Cookies.set("selectionType", $('input[type="radio"][name="selectionType"]:checked').val(), {expires: 365});
		Cookies.set("numImagesToGet", $('input[type="radio"][name="numImages"]:checked').val(), {expires: 365});
	}
	
	function getSafeSearchCookie()
	{
		var cookie = Cookies.get("safeSearch");
		if(typeof cookie != "undefined")
		{
			$('#safeSearchModerate, #safeSearchRestricted, #safeSearchSafe').prop("checked", false);
			switch(cookie)
			{
				case "safe":
					$('#safeSearchSafe').prop("checked", true);
					break;
				case "moderate":
					$('#safeSearchModerate').prop("checked", true);
					break;
				case "restricted":
					$('#safeSearchRestricted').prop("checked", true);
					break;
			}
		}
	}
	
	function setSafeSearchCookie()
	{
		Cookies.set("safeSearch", $("input[type='radio'][name='safeSearch']:checked").val(), {expires: 365});
	}

	function getMediaCookie()
	{
		var cookie = Cookies.get("media");
		if(typeof cookie != "undefined")
		{
			$('#media-all, #media-photos, #media-videos').prop("checked", false);
			switch(cookie)
			{
				case "all":
					$('#media-all').prop("checked", true);
					break;
				case "photos":
					$('#media-photos').prop("checked", true);
					break;
				case "videos":
					$('#media-videos').prop("checked", true);
					break;
			}
		}
	}
	
	function setMediaCookie()
	{
		Cookies.set("media", $("input[type='radio'][name='mediaRadio']:checked").val(), {expires: 365});
	}

	function getDateCookies()
	{
		var cookie = Cookies.get("dateType");
		if(typeof cookie != "undefined")
		{
			// "random" is default on load, so we don't need to do anything
			if(cookie == "choose")
			{
				$('#chooseDate').click();
				var startDateCookie = Cookies.get("startDate");
				var startHoursCookie = Cookies.get("startHours");
				var startMinsCookie = Cookies.get("startMins");
				var endDateCookie = Cookies.get("endDate");
				var endHoursCookie = Cookies.get("endHours");
				var endMinsCookie = Cookies.get("endMins");
				if(typeof startDateCookie != "undefined")
				{
					$('#startDateBox').val(startDateCookie);
				}
				if(typeof startHoursCookie != "undefined")
				{
					$('#startTimeDD').val(startHoursCookie);
				}
				if(typeof startMinsCookie != "undefined")
				{
					$('#startTimeMinDD').val(startMinsCookie);
				}
				if(typeof endDateCookie != "undefined")
				{
					$('#endDateBox').val(endDateCookie);
				}
				if(typeof endHoursCookie != "undefined")
				{
					$('#endTimeDD').val(endHoursCookie);
				}
				if(typeof endMinsCookie != "undefined")
				{
					$('#endTimeMinDD').val(endMinsCookie);
				}
			}
		}
	}
	
	function setDateCookie()
	{
		if($("input[type='radio'][name='dateType']:checked").val() == "choose")
		{
			Cookies.set("dateType", "choose", {expires: 365});
			Cookies.set("startDate", $('#startDateBox').val(), {expires: 365});
			Cookies.set("startHours", $('#startTimeDD').val(), {expires: 365});
			Cookies.set("startMins", $('#startTimeMinDD').val(), {expires: 365});
			Cookies.set("endDate", $('#endDateBox').val(), {expires: 365});
			Cookies.set("endHours", $('#endTimeDD').val(), {expires: 365});
			Cookies.set("endMins", $('#endTimeMinDD').val(), {expires: 365});
		}
		else
		{
			Cookies.remove("startDate");
			Cookies.remove("startHours");
			Cookies.remove("startMins");
			Cookies.remove("endDate");
			Cookies.remove("endHours");
			Cookies.remove("endMins");
			Cookies.set("dateType", "random", {expires: 365});
		}
	}
	
	function getMediumSizeSrc(imageSizeObj)
	{
		for(var i = 0; i < imageSizeObj.length; i++)
		{
			if(imageSizeObj[i].label == "Medium")
			{
				return imageSizeObj[i].source;
			}
		}
		return imageSizeObj[imageSizeObj.length - 1].source;
	}
	
	function getOriginalSizeSrc(imageSizeObj)
	{
		for(var i = 0; i < imageSizeObj.length; i++)
		{
			if(imageSizeObj[i].label == "Original")
			{
				return imageSizeObj[i].source;
			}
		}
		return imageSizeObj[imageSizeObj.length - 1].source;
	}
	
	function getImageWidth(imageSizeObj)
	{
		for(var i = 0; i < imageSizeObj.length; i++)
		{
			if(imageSizeObj[i].label == "Original")
			{
				return imageSizeObj[i].width;
			}
		}
		return imageSizeObj[imageSizeObj.length - 1].width;
	}
	
	function getImageHeight(imageSizeObj)
	{
		for(var i = 0; i < imageSizeObj.length; i++)
		{
			if(imageSizeObj[i].label == "Original")
			{
				return imageSizeObj[i].height;
			}
		}
		return imageSizeObj[imageSizeObj.length - 1].height;
	}

	function downloadImages()
	{
		localStorage.setItem("randm-flickr-pickr.downloadImages", JSON.stringify(displayedImages));
		window.open("download.html", "_blank");
	}

	function getSelectedImage(minDate, maxDate, word, userid, index, totalPhotos, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, listObj)
	{
		var pageNumber = Math.floor((index + 1) / itemsPerPage) + 1;
		if(pageNumber == 1)
		{
			doneGetSelectedImage(minDate, maxDate, word, userid, index, totalPhotos, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, listObj);
			return;
		}
		var minDateString = "";
		var maxDateString = "";
		var wordString = "";
		var useridString = "";
		
		if(minDate !== null && maxDate !== null && maxDate > minDate)
		{
			minDateString = "&min_upload_date=" + minDate;
			maxDateString = "&max_upload_date=" + maxDate;
		}
		
		if(word !== null)
		{
			wordString = "&text=" + encodeURIComponent(word);
		}
		
		if(userid !== null)
		{
			useridString = "&user_id=" + encodeURIComponent(userid);
		}
		
		var safeSearch = "";
		switch(safeSearchChosen)
		{
			case "safe":
				safeSearch = "&safe_search=1";
				break;
			case "moderate":
				safeSearch = "&safe_search=2";
				break;
			case "restricted":
				safeSearch = "&safe_search=3";
				break;
		}
		
		var colors = "";
		if(currentColors.length > 0)
		{
			colors += "&color_codes=" + currentColors.join();
		}
		
		var styles = "";
		if(currentStyles.length > 0)
		{
			styles += "&styles=" + currentStyles.join();
		}
		
		var orientations = "&orientation=" + currentOrientations.join();
		
		var minSizeString = "";
		if(minWidth !== null || minHeight !== null)
		{
			minSizeString = "&dimension_search_mode=min";
			if(minWidth !== null)
			{
				minSizeString += "&width=" + minWidth;
			}
			if(minHeight !== null)
			{
				minSizeString += "&height=" + minHeight;
			}
		}
		var mediaString = "";
		if(media != "all")
		{
			mediaString = "&media=" + media;
		}
		
				
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrAPIKey + "&license=" + currentLicenses.join() + minDateString + maxDateString + wordString + useridString + colors + styles + orientations + safeSearch + minSizeString + mediaString + "&per_page=" + itemsPerPage + "&page=" + pageNumber + "&format=json&nojsoncallback=1";
		(function(totalPhotos, minDate, maxDate, safeSearchChosen, index, url, word, userid, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses)
		{
			$.ajax({
				method: "POST",
				url: url
			}).done(function(msg) {
				if(typeof msg.stat !== "undefined" && msg.stat == "fail")
				{
					alert("Flickr error: " + msg.message);
				}
				else
				{
					var newListObj = msg.photos;
					doneGetSelectedImage(minDate, maxDate, word, userid, index, totalPhotos, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, newListObj);
				}
			});
		})(totalPhotos, minDate, maxDate, safeSearchChosen, index, url, word, userid, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
	}
	
	function doneGetSelectedImage(minDate, maxDate, word, userid, index, totalPhotos, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, listObj)
	{
		if((listObj.photo.length - 1) < (index % itemsPerPage))
		{
			// dammit, Flickr, y u no return as many images as you said you would?
			// ::sigh:: let's just pick one of the ones you did give us. unless it's not picking randomly, then we don't know what to do.
			if(listObj.photo.length == 0)
			{
				//console.log("Flickr returned 0 images even though it said it would give more.");
			}
			else
			{
				//console.log("Could not find image at index " + index + " out of " + totalPhotos + " total photos.");
			}
			if(!isRandom)
			{
				messageOutput("Flickr error: API call returned fewer images than it said it would.");
			}
			else
			{
				if(listObj.photo.length == 0)
				{
					var newDates = expandDateRange(minDate, maxDate);
					minDate = newDates[0];
					maxDate = newDates[1];
					if(minDate < flickrOrigin)
					{
						minDate = flickrOrigin;
						maxDate += (flickrOrigin - newDates[0]);
					}
					if(maxDate > now)
					{
						maxDate = now;
						minDate -= (newDates[1] - now);
					}
					if(minDate < flickrOrigin)
					{
						minDate = flickrOrigin;
					}
					checkResultCount(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
				}
				else
				{
					var randImageIndex = Math.floor(Math.random() * listObj.photo.length);
					var imageObj = listObj.photo[randImageIndex];
					getImageInfo(imageObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses);
				}
			}
		}
		else
		{
			var imageObj = listObj.photo[(index % itemsPerPage)];
			getImageInfo(imageObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses);
		}
	}
	
	function messageOutput(outputString)
	{
		$('#imageHolder').append("<div class='message'>" + outputString + "</div>");
	}

	function outputImageData(imageInfoObj, imageSizeObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles)
	{
		imagesReturned++;
		if(imagesReturned == startingNumImages)
		{
			$("#getImages").css("color", "#000000");
		}
		var username = imageInfoObj.owner.username;
		if(imageInfoObj.owner.realname != "")
		{
			username += " (" + imageInfoObj.owner.realname + ")";
		}
		var datePosted = new Date(imageInfoObj.dateuploaded * 1000);
		var minDateString = new Date(minDate * 1000);
		minDateString = dateToString(minDateString);
		var maxDateString = new Date(maxDate * 1000);
		maxDateString = dateToString(maxDateString);
		var origDateString = "";
		if(choseDate && (minDate != origMinDate || maxDate != origMaxDate))
		{
			var origMinDateString = new Date(origMinDate * 1000);
			origMinDateString = dateToString(origMinDateString);
			var origMaxDateString = new Date(origMaxDate * 1000);
			origMaxDateString = dateToString(origMaxDateString);
			origDateString = "<div class='origMinDate'>" +
					"<div class='label'><em>Min Date Set:</em></div> " + origMinDateString +
				"</div>" +
				"<div class='origMaxDate'>" +
					"<div class='label'><em>Max Date Set:</em></div> " + origMaxDateString +
				"</div>";
		}
		var wordString = "";
		if(word !== null)
		{
			wordString = "<div class='wordSearch'>" +
				"<div class='label'><em>Search String:</em></div> " + word +
			"</div>";
		}
		var colorString = "";
		if(currentColors.length > 0)
		{
			colorString = "<div class='colorSearch'>" +
				"<div class='label'><em>Colors Searched:</em></div> ";
			for(var i = 0; i < currentColors.length; i++)
			{
				colorString += getColorNameByFlickrId(currentColors[i]) + ", ";
			}
			colorString = colorString.substr(0, colorString.length - 2);
			colorString += "</div>";
		}
		var styleString = "";
		if(currentStyles.length > 0)
		{
			styleString = "<div class='styleSearch'>" +
				"<div class='label'><em>Styles Searched:</em></div> ";
			for(var i = 0; i < currentStyles.length; i++)
			{
				styleString += getStyleNameByFlickrText(currentStyles[i]) + ", ";
			}
			styleString = styleString.substr(0, styleString.length - 2);
			styleString += "</div>";
		}
		
		
		var imageLicense = getLicenseName(imageInfoObj.license);
		var appendedImage = $("<div class='singleImageHolder'>" +
				"<a href='" + imageInfoObj.urls.url[0]._content + "' target='_blank'>" +
					"<img src='" + getMediumSizeSrc(imageSizeObj) + "'>" +
				"</a></div>");
		displayedImages.push([getOriginalSizeSrc(imageSizeObj), imageInfoObj.urls.url[0]._content]);
		var imageTooltip = $("<div class='imageTextHolder'>" +
				"<div class='imageName'><div class='label'><em>Title:</em></div> " +
					imageInfoObj.title._content +
				"</div>" +
				"<div class='photographerUsername'><div class='label'><em>Artist:</em></div> " +
					username +
				"</div>" +
				"<div class='datePosted'><div class='label'><em>Uploaded:</em></div> " +
					dateToString(datePosted) +
				"</div>" +
				"<div class='license'><div class='label'><em>License:</em></div> " +
					imageLicense +
				"</div>" +
				"<div class='imageSize'><div class='label'><em>Size:</em></div> " +
					getImageWidth(imageSizeObj) + "px x " + getImageHeight(imageSizeObj) + "px" +
				"</div>" +
				"<div class='mediaType'><div class='label'><em>Media Type:</em></div> " +
					imageInfoObj.media +
				"</div>" +
				"<div class='safeSearch'><div class='label'><em>Safe Search:</em></div> " +
					safeSearchChosen +
				"</div>" +
				"<div class='minDate'>" + "<div class='label'><em>Min Date:</em></div> " +
					minDateString +
				"</div>" +
				"<div class='maxDate'>" + "<div class='label'><em>Max Date:</em></div> " +
					maxDateString +
				"</div>" +
				wordString +
				origDateString +
				colorString +
				styleString +
			"</div>");
		$('#imageHolder').append(appendedImage);
		appendedImage.tooltip({
			content: imageTooltip,
			items: appendedImage,
			track: true
		});
	}
	
	function getImageSize(imageInfoObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles)
	{
		var thisUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickrAPIKey + "&photo_id=" + imageInfoObj.id + "&secret=" + imageInfoObj.secret + "&format=json&nojsoncallback=1";
		(function(imageInfoObj, totalPhotos, minDate, maxDate, safeSearchChosen, thisUrl, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles)
		{
			$.ajax({
				method: "POST",
				url: thisUrl
			}).done(function(msg) {
				if(typeof msg.stat === "undefined" && msg.stat == "fail")
				{
					alert("Flickr error: " + msg.message);
				}
				else
				{
					imageSizeObj = msg.sizes.size;
					outputImageData(imageInfoObj, imageSizeObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles);
				}
			});
		})(imageInfoObj, totalPhotos, minDate, maxDate, safeSearchChosen, thisUrl, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles);
	}
	
	function getImageInfo(imageObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses)
	{
		var thisUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + flickrAPIKey + "&photo_id=" + imageObj.id + "&secret=" + imageObj.secret + "&format=json&nojsoncallback=1";
		(function(totalPhotos, minDate, maxDate, safeSearchChosen, thisUrl, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses)
		{
			$.ajax({
				method: "POST",
				url: thisUrl
			}).done(function(msg) {
				if(typeof msg.stat !== "undefined" && msg.stat == "fail")
				{
					alert("Flickr error: " + msg.message);
				}
				else
				{
					var imageInfoObj = msg.photo;
					if(currentQueryIds.indexOf(msg.photo.id) == -1)
					{
						currentQueryIds.push(msg.photo.id);
						getImageSize(imageInfoObj, totalPhotos, minDate, maxDate, safeSearchChosen, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses);
					}
					else
					{
						currentQueryIds.push(msg.photo.id);
						if(choseDate)
						{
							startChooseImage(minDate, maxDate, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						}
						else
						{
							startChooseImage(null, null, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						}
						
					}
				}
			});
		})(totalPhotos, minDate, maxDate, safeSearchChosen, thisUrl, word, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, userid, isRandom, currentOrientations, minWidth, minHeight, media, currentLicenses);
	}
	
	function getLicenseName(id)
	{
		for(var i = 0; i < licenseList.length; i++)
		{
			if(licenseList[i].id == id)
			{
				return licenseList[i].name;
			}
		}
		return null;
	}
	
	function getLicenses()
	{
		$.ajax({
			method: "POST",
			url: "https://api.flickr.com/services/rest/?method=flickr.photos.licenses.getInfo&api_key=" + flickrAPIKey + "&format=json&nojsoncallback=1"
		}).done(function(msg) {
			if(typeof msg.stat !== "undefined" && msg.stat == "fail")
			{
				alert("Flickr error: " + msg.message);
			}
			else
			{
				licenseList = msg.licenses.license;
				licenseList.sort(function(a, b)
				{
					if(a.name < b.name)
					{
						return -1;
					}
					if(a.name > b.name)
					{
						return 1;
					}
					return 0;
				});
				populateForm(licenseList);
			}
		});
	}
	
	function populateForm(licenses)
	{
		$('#licenseForm').html("");
		$('#licenseForm').append("<table id='licenseTable'>");

		for(var i = 0; i < licenses.length; i++)
		{
			$('#licenseTable').append(
				"<tr>" +
					"<td class='checkboxCell'>" +
						"<input class='idBox' type='checkbox' id='license-" + licenses[i].id + "' name='license-" + licenses[i].id + "'>" +
					"</td>" +
					"<td class='labelCell'>" +
						"<label for='license-" + licenses[i].id + "'>" + licenses[i].name + "</label>" +
					"</td>" + 
				"</tr>");
		}
		
		$('#licenseForm').append("</table>");
		getLicenseCookies();
	}
	
	function checkResultCount(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses)
	{
		var minDateString = "&min_upload_date=" + minDate;
		var maxDateString = "&max_upload_date=" + maxDate;
		var wordString = "";
		
		if(word !== null)
		{
			wordString = "&text=" + encodeURIComponent(word);
		}
		
		var useridString = "";
		if(userid !== null)
		{
			useridString = "&user_id=" + encodeURIComponent(userid);
		}
		
		var safeSearch = "";
		
		switch(safeSearchChosen)
		{
			case "safe":
				safeSearch = "&safe_search=1";
				break;
			case "moderate":
				safeSearch = "&safe_search=2";
				break;
			case "restricted":
				safeSearch = "&safe_search=3";
				break;
		}
		
		var colors = "";
		if(currentColors.length > 0)
		{
			colors += "&color_codes=" + currentColors.join();
		}
		
		var styles = "";
		if(currentStyles.length > 0)
		{
			styles += "&styles=" + currentStyles.join();
		}
		
		var orientations = "&orientation=" + currentOrientations.join();
		
		var minSizeString = "";
		if(minWidth !== null || minHeight !== null)
		{
			minSizeString = "&dimension_search_mode=min";
			if(minWidth !== null)
			{
				minSizeString += "&width=" + minWidth;
			}
			if(minHeight !== null)
			{
				minSizeString += "&height=" + minHeight;
			}
		}
		var mediaString = "";
		if(media != "all")
		{
			mediaString = "&media=" + media;
		}

		
		var ajaxUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrAPIKey + "&license=" + currentLicenses.join() + minDateString + maxDateString + wordString + useridString + colors + styles + orientations + safeSearch + minSizeString + mediaString + "&url_o&per_page=" + itemsPerPage + "&format=json&nojsoncallback=1";
		(function(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses)
		{
			$.ajax({
				method: "POST",
				url: ajaxUrl
				
			}).done(function(msg) {
				if(typeof msg.stat !== "undefined" && msg.stat == "fail")
				{
					alert("Flickr error: " + msg.message);
				}
				else
				{
					var photos = msg.photos;
					var totalPhotos = parseInt(photos.total);
					var newDates;
					if(choseDate)
					{
						if(totalPhotos <= 0)
						{
							if(minDate !== origMinDate || maxDate !== origMaxDate)
							{
								alert("That's weird. First too many images were found, then the date range was shrunk to just the center of the time frame, and then no images were found. Please try another date range.");
								return;
							}
							alert("Sorry, no images were found with the selected criteria.");
							return;
						}
						if(totalPhotos >= 4000 && isRandom)
						{
							// just pick one of the first 4000 for now, this gets ridiculous eventually
							pickImage(photos, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
							return;
							// if they want the first X images, don't contract the range they asked for. otherwise, do this.
							/*newDates = contractDateRange(minDate, maxDate);
							if(newDates == null)
							{
								// contracting didn't change the dates. we can't get any smaller. just pick something.
								pickImage(photos, minDate, maxDate, word, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
								return;
							}
							minDate = newDates[0];
							maxDate = newDates[1];
							checkResultCount(minDate, maxDate, word, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
							return;*/
						}
						pickImage(photos, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						return;
					}
					if(totalPhotos <= 0 || (!isRandom && (totalPhotos < numImages)))
					{
						if(minDate <= flickrOrigin && maxDate >= now)
						{
							if(totalPhotos <= 0)
							{
								// reached largest possible date range, but no images found
								alert("Sorry, no images were found with the selected criteria.");
								return;
							}
							// otherwise, reached largest possible date range, but not as many images found as requested
							messageOutput(numImages + " requested, but only " + totalPhotos + " were found. Returning all " + totalPhotos + ".");
							numImages = totalPhotos;
							pickImage(photos, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
							return;
						}
						var newDates = expandDateRange(minDate, maxDate);
						minDate = newDates[0];
						maxDate = newDates[1];
						if(minDate < flickrOrigin)
						{
							minDate = flickrOrigin;
							maxDate += (flickrOrigin - newDates[0]);
						}
						if(maxDate > now)
						{
							maxDate = now;
							minDate -= (newDates[1] - now);
						}
						if(minDate < flickrOrigin)
						{
							minDate = flickrOrigin;
						}
						checkResultCount(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						return;
					}
					if(totalPhotos >= 4000)
					{
						// just pick one of the first 4000, this gets ridiculous eventually
						pickImage(photos, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						return;
						/*if(minDate < origMinDate || maxDate > origMaxDate)
						{
							// we already just expanded from having nothing, just pick an image even though there's lots
							pickImage(photos, minDate, maxDate, word, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
							return;
						}
						var newDates = contractDateRange(minDate, maxDate);
						if(newDates == null)
						{
							// contracting didn't change the dates. we can't get any smaller. just pick something.
							pickImage(photos, minDate, maxDate, word, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
							return;
						}
						minDate = newDates[0];
						maxDate = newDates[1];
						checkResultCount(minDate, maxDate, word, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
						return;*/
					}
					pickImage(photos, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
				}
			});
		})(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
	}
	
	function startChooseImage(minDate, maxDate, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses)
	{
		// Calls ajax function. No return.
		
		var now = Math.floor((Date.now() - (timeDifferenceMS)) / 1000);
		if(minDate == null && maxDate == null)
		{
			// choose a 2-hour block of time since the beginning of Flickr. These variables are global.
			minDate = Math.floor(Math.random() * (now - flickrOrigin + 1)) + flickrOrigin;
			maxDate = minDate + (timeDifference);
		}
		

		var origMinDate = minDate;
		var origMaxDate = maxDate;
		checkResultCount(minDate, maxDate, word, userid, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, now, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
	}
	
	function pickImage(listObj, minDate, maxDate, word, userid, safeSearchChosen, origMinDate, origMaxDate, choseDate, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses)
	{
		var totalPhotos = parseInt(listObj.total);
		if(totalPhotos > 4000)
		{
			totalPhotos = 4000; // Flickr lies. It never returns more than 4000. So only pick one of those.
		}
		if(isRandom)
		{
			var randomImage = Math.floor(Math.random() * totalPhotos);
			getSelectedImage(minDate, maxDate, word, userid, randomImage, totalPhotos, safeSearchChosen, true, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, listObj);
			numImages--;
			if(numImages > 0)
			{
				if(choseDate)
				{
					startChooseImage(minDate, maxDate, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
				}
				else
				{
					startChooseImage(null, null, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
				}
			}
		}
		else
		{
			for(var i = 0; i < numImages; i++)
			{
				getSelectedImage(minDate, maxDate, word, userid, i, totalPhotos, safeSearchChosen, isRandom, origMinDate, origMaxDate, choseDate, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses, listObj);
			}
		}
	}
	
	function resetCookies()
	{
		setLicenseCookies();
		setColorSearchCookie();
		setStyleSearchCookie();
		setTextCookie();
		setUseridCookie();
		setNumberCookies();
		setSafeSearchCookie();
		setDateCookie();
		setOrientationCookie();
		setMinWidthCookie();
		setMinHeightCookie();
		setMediaCookie();
	}
	
	function submitForm(isRandom)
	{
		currentQueryIds.length = 0;
		var word = null;
		if($("#textTagBox").val() !== "")
		{
			word = $("#textTagBox").val();
		}
		var userid = null;
		if($("#useridBox").val() !== "")
		{
			userid = $("#useridBox").val();
		}
		selectedLicenses.length = 0;
		$('#licenseForm .idBox:checked').each(function() {
			
			selectedLicenses.push($(this).attr('id').substr(8));
		});
		if(selectedLicenses.length == 0)
		{
			alert("Error: Choose at least one license.");
			return false;
		}
		var currentLicenses = selectedLicenses.slice(0);
		if($('#licenseForm .idBox').length == $('#licenseForm .idBox:checked').length)
		{
			currentLicenses = [];
		}
		
		selectedColors.length = 0;
		$('.colorLink.checked').each(function() {
			selectedColors.push($(this).attr("data-flickr-id"));
		});
		
		var currentColors = selectedColors.slice(0);
		
		selectedStyles.length = 0;
		$('#styleChooser input:checked').each(function()
		{
			selectedStyles.push($(this).val());
		});
		
		var currentStyles = selectedStyles.slice(0);
		
		selectedOrientations.length = 0;
		$('#orientationChooser input:checked').each(function()
		{
			selectedOrientations.push($(this).val());
		});
		
		if(selectedOrientations.length == 0)
		{
			alert("Error: Choose at least one orientation.");
			return false;
		}
		
		var currentOrientations = selectedOrientations.slice(0);
		
		var minWidth = null;
		if($("#size-width").val() != "" && !isNaN(parseInt($("#size-width").val())))
		{
			minWidth = parseInt($("#size-width").val());
		}
		var minHeight = null;
		if($("#size-height").val() != "" && !isNaN(parseInt($("#size-height").val())))
		{
			minHeight = parseInt($("#size-height").val());
		}
		
		var media = $("input[type='radio'][name='mediaRadio']:checked").val();
		
		var minDate = null;
		var maxDate = null;
		var choseDate = false;
		if($("input[type='radio'][name='dateType']:checked").length == 0)
		{
			alert("Error: Select a Date Range type.");
			return false;
		}
		if($("input[type='radio'][name='safeSearch']:checked").length == 0)
		{
			alert("Error: Select a Safe Search type.");
			return false;
		}
		if($("input[type='radio'][name='mediaRadio']:checked").length == 0)
		{
			alert("Error: Select a Media Type.");
			return false;
		}
		if($("input[type='radio'][name='dateType']:checked").val() == "choose")
		{
			choseDate = true;
			if($('#startDateBox').val() == "")
			{
				alert("Error: Choose start date or select 'Use Random Date'.");
				return false;
			}
			if($('#endDateBox').val() == "")
			{
				alert("Error: Choose end date or select 'Use Random Date'.");
				return false;
			}
			if(!$('#startTimeDD').val())
			{
				alert("Error: Choose start time hours or select 'Use Random Date'.");
				return false;
			}
			if(!$('#startTimeMinDD').val())
			{
				alert("Error: Choose start time minutes or select 'Use Random Date'.");
				return false;
			}
			if(!$('#endTimeDD').val())
			{
				alert("Error: Choose end time hours or select 'Use Random Date'.");
				return false;
			}
			if(!$('#endTimeMinDD').val())
			{
				alert("Error: Choose end time minutes or select 'Use Random Date'.");
				return false;
			}
			var minDateString = $('#startDateBox').val().toString() + " " + $('#startTimeDD').val().toString() + ":" + $('#startTimeMinDD').val().toString() + ":00";
			minDate = Math.round(new Date(minDateString).getTime()/1000);
			var maxDateString = $('#endDateBox').val().toString() + " " + $('#endTimeDD').val().toString() + ":" + $('#endTimeMinDD').val().toString() + ":00";
			maxDate = Math.round(new Date(maxDateString).getTime()/1000);
			if(maxDate <= minDate)
			{
				alert("Error: Choose an end time after the start time or select 'Use Random Date'.");
				return false;
			}
		}
		if(numImages > 100)
		{
			alert("Warning: This system will only retrieve 100 images maximum.");
			numImages = 100;
			$("#numImagesBox").val(100);
		}
		var safeSearchChosen = $('input:radio[name="safeSearch"]:checked').val();
		resetCookies();
		startChooseImage(minDate, maxDate, word, userid, choseDate, safeSearchChosen, isRandom, currentColors, currentStyles, currentOrientations, minWidth, minHeight, media, currentLicenses);
	}
	
	function populateSummary()
	{
		var selectedLicenseText = "";
		$('#licenseForm .idBox:checked').each(function() {
			selectedLicenseText += $(this).parent().parent().find('.labelCell label').html() + ", ";
		});
		if(selectedLicenseText == "")
		{
			selectedLicenseText = "None";
		}
		else
		{
			selectedLicenseText = selectedLicenseText.substring(0, (selectedLicenseText.length - 2));
		}
		var selectedColorsText = "";
		$('.colorLink.checked').each(function()
		{
			selectedColorsText += $(this).attr("title") + ", ";
		});
		if(selectedColorsText != "")
		{
			selectedColorsText = selectedColorsText.substr(0, selectedColorsText.length - 2);
			selectedColorsText = "; <strong>Colors:</strong> " + selectedColorsText;
		}
		
		var selectedStylesText = "";
		$('#styleChooser input:checked').each(function()
		{
			selectedStylesText += $(this).parent().find('label').html() + ", ";
		});
		if(selectedStylesText != "")
		{
			selectedStylesText = selectedStylesText.substr(0, selectedStylesText.length - 2);
			selectedStylesText = "; <strong>Styles:</strong> " + selectedStylesText;
		}
		
		selectedLicenseText = "<strong>Licenses:</strong> " + selectedLicenseText;
		
		var selectedOrientationsText = "";
		$('#orientationChooser input:checked').each(function()
		{
			selectedOrientationsText += $(this).parent().find('label').html() + ", ";
		});
		if(selectedOrientationsText != "")
		{
			selectedOrientationsText = selectedOrientationsText.substr(0, selectedOrientationsText.length - 2);
		}
		else
		{
			selectedOrientationsText = "None";
		}
		selectedOrientationsText = "<strong>Orientations:</strong> " + selectedOrientationsText;
		
		var safeSearchText = "<strong>Safe Search:</strong> " + $("input:radio[name = 'safeSearch']:checked").val();

		var selectedDateType = $("input:radio[name = 'dateType']:checked").attr("id");
		var dateText = "<strong>Date: </strong>" + $("label[for = '" + selectedDateType + "']").text();
		if($("#chooseDate").is(":checked"))
		{
			dateText += " ";
			var startTimeDD = $("#startTimeDD option:selected").text();
			var endTimeDD = $("#endTimeDD option:selected").text();
			dateText += "(" + $("#startDateBox").val() + " " + startTimeDD.substr(0, startTimeDD.length - 3) + $("#startTimeMinDD option:selected").text() + startTimeDD.substr(startTimeDD.length - 3) + " - ";
			dateText += $("#endDateBox").val() + " " + endTimeDD.substr(0, endTimeDD.length - 3) + $("#endTimeMinDD option:selected").text() + endTimeDD.substr(endTimeDD.length - 3) + ")";
		}
		
		var textTagText = "";
		if($("#textTagBox").val() !== "")
		{
			textTagText = "; <strong>Text/Tag: </strong>" + $("#textTagBox").val();
		}
		
		var minSizeText = "";
		if($('#size-width').val() != "")
		{
			minSizeText += $('#size-width').val() + " px wide";
		}
		if($('#size-width').val() != "" && $('#size-height').val() != "")
		{
			minSizeText += " x ";
		}
		if($('#size-height').val() != "")
		{
			minSizeText += $('#size-height').val() + " px tall";
		}
		if(minSizeText != "")
		{
			minSizeText = "; <strong>Minimum Size:</strong> " + minSizeText;
		}
		
		var mediaTypeText = "<strong>Media Type:</strong> ";
		mediaTypeText += $("#mediaTypeChooser input:checked").parent().find('label').html();
		
		
/*		var showDescriptionText = "<strong>Image Descriptions:</strong> ";
		switch($("#descriptionText input:checked").val())
		{
			case "show":
				showDescriptionText += "Show";
				break;
			case "hide":
				showDescriptionText += "Hide";
				break;
		}*/
		
		$('#configSummary').html(selectedLicenseText + "; " + safeSearchText + "; " + dateText + textTagText + selectedColorsText + selectedStylesText + "; " + selectedOrientationsText + minSizeText + "; " + mediaTypeText);
	}
	
	function expandDateRange(minDate, maxDate)
	{
		// returns array of length 2 [newMinDate, newMaxDate]
		// returns null if things don't make sense
		if(maxDate <= minDate)
		{
			// error checking, you never know
			return null;
		}
		var rangeLength = maxDate - minDate;
		var newMinDate = minDate - Math.floor(rangeLength / 2);
		var newMaxDate = maxDate + Math.floor(rangeLength / 2);
		return [newMinDate, newMaxDate];
	}
	
	function contractDateRange(minDate, maxDate)
	{
		// returns array [newMinDate, newMaxDate]
		if(maxDate <= minDate)
		{
			return null;
		}
		var rangeLength = maxDate - minDate;
		// divide by 4 because we want it to be half as long, and then we want half of that added/subtracted to beginning/end
		var newMinDate = minDate + Math.floor(rangeLength / 4);
		var newMaxDate = maxDate - Math.floor(rangeLength / 4);
		if((minDate == newMinDate) && (maxDate == newMaxDate))
		{
			return null;
		}
		return [newMinDate, newMaxDate];
	}
	
	function getHeaderSize()
	{
		var height = document.getElementById("buttonsRight").offsetHeight;
		document.getElementById("imageHolder").style.paddingTop = height + 'px'; 
	}
	
	$(function() {
		$('.colorLink').tooltip();
		$('#showOptions').hide();
		$('#configSummary').hide();
		$('#dateChooser').hide();
		$('.downArrow').hide();
		$('#addlInfoShowHide').find('.upArrow, .downArrow').toggle();
		$('#numImagesBox').click(function()
		{
			$('#num1, #num10').prop("checked", false);
			$('#numX').prop("checked", true);
		});
		$('.sectionLabel').click(function()
		{
			$(this).parent().find('.sectionContent').toggle();
			$(this).find('.upArrow, .downArrow').toggle();
			setSectionExpandCookies();
			return false;
		});
		$('#searchConfigShowHide').click(function()
		{
			$('#searchConfigOptions').toggleClass("expanded");
			$(this).find('.upArrow, .downArrow').toggle();
			setSectionExpandCookies();
			return false;
		});
		$('#displayConfigShowHide').click(function()
		{
			$('#displayConfigOptions').toggleClass("expanded");
			$(this).find('.upArrow, .downArrow').toggle();
			setSectionExpandCookies();
			return false;
		});
		$('#addlInfoShowHide').click(function()
		{
			$('#addlInfoContent').toggleClass("expanded");
			$(this).find('.upArrow, .downArrow').toggle();
			return false;
		});
		$('#getImages').click(function()
		{
			$('#getImages').css("color", "#666666");
			var isRandom = true;
			if($("input[type='radio'][name='selectionType']:checked").val() == 'first')
			{
				isRandom = false;
			}
			var numImagesToGet = 0;
			switch($("input[type='radio'][name='numImages']:checked").val())
			{
				case "1":
					numImagesToGet = 1;
					break;
				case "10":
					numImagesToGet = 10;
					break;
				case "X":
					numImagesToGet = parseInt($('#numImagesBox').val());
					break;
			}
			numImages = numImagesToGet;
			startingNumImages = numImages;
			imagesReturned = 0;
			submitForm(isRandom);
			return false;
		});
		$('#downloadImages').click(function()
		{
			downloadImages();
			return false;
		});
		$('#clearImages').click(function()
		{
			$('#imageHolder').html('');
			displayedImages.length = 0;
			return false;
		});
		$('#chooseDate').click(function()
		{
			$('#dateChooser').show();
		});
		$('#randomDate').click(function()
		{
			$('#dateChooser').hide();
		});
		$('#startDateBox, #endDateBox').datepicker({
			constrainInput: true,
			dateFormat: "yy-mm-dd",
			gotoCurrent: true
		});
		$('#randomWord').click(function()
		{
			$.get("nounlist/nounlist.txt", function(txt)
			{
				var lines = txt.split("\n");
				var randLineNum = Math.floor(Math.random() * lines.length);
				$('#textTagBox').val(lines[randLineNum]);
			});
			return false;
		});
		$('#clearWordBox').click(function()
		{
			$('#textTagBox').val('');
		});
		$('#clearUseridBox').click(function()
		{
			$('#useridBox').val('');
		});
		$('#imageHolder').on('click', '.singleTextShow', function()
		{
			$(this).parent().parent().find('.imageTextHolder').show();
			$(this).hide();
			$(this).siblings('.singleTextHide').show();
			return false;
		});
		$('#imageHolder').on('click', '.singleTextHide', function()
		{
			$(this).parent().parent().find('.imageTextHolder').hide();
			$(this).hide();
			$(this).siblings('.singleTextShow').show();
			return false;
		});
/*		$("#showAllDescriptionText").click(function()
		{
			$("#descText").attr("href", "css/showDesc.css");
			$('.imageTextHolder, .singleTextShow, .singleTextHide').removeAttr("style");
			setDescTextCookie(true);
		});
		$("#hideAllDescriptionText").click(function()
		{
			$("#descText").attr("href", "css/hideDesc.css");
			$('.imageTextHolder, .singleTextShow, .singleTextHide').removeAttr("style");
			setDescTextCookie(false);
		});
		*/
		$('#largeDisplaySize').click(function()
		{
			$("#imageDisplaySize").attr("href", "css/large.css");
			setDisplaySizeCookie("large");
		});
		$('#mediumDisplaySize').click(function()
		{
			$("#imageDisplaySize").attr("href", "css/medium.css");
			setDisplaySizeCookie("medium");
		});
		$('#smallDisplaySize').click(function()
		{
			$("#imageDisplaySize").attr("href", "css/small.css");
			setDisplaySizeCookie("small");
		});
		$('.colorLink').click(function()
		{
			toggleColorLink(this);
			selectedColors.length = 0;
			$('.colorLink.checked').each(function() {
				selectedColors.push($(this).attr("data-flickr-id"));
			});
			setColorSearchCookie();
			return false;
		});
		$('#clearColors').click(function()
		{
			selectedColors.length = 0;
			$('.colorLink.checked').addClass("unchecked").removeClass("checked");
			setColorSearchCookie();
			return false;
		});
		
		if(!supportsHtml5Storage())
		{
			$('#imageDownloadLink').html('');
		}
		
		
		getLicenses();
		getNumberCookies();
		getSafeSearchCookie();
		getDateCookies();
		getTextCookie();
		getUseridCookie();
//		getDescTextCookie();
		getDisplaySizeCookie();
		getColorSearchCookie();
		getStyleSearchCookie();
		getOrientationCookie();
		getMinWidthCookie();
		getMinHeightCookie();
		getMediaCookie();
		getSectionExpandCookies();

		var emailAddr = "cassandra";
		emailAddr += "@" + "gelvins.com";
		$('#emailMe').attr("href", "mailto:" + emailAddr);
	});
	
</script>

</head>

<body>
	<div id="outerContainer">
	<div id="colHolder" class="group">
	<div id="col1">
	<div id="pageTitle">
		<h1>Randm Flickr Pickr by Cassandra Gelvin</h1>
	</div>
	<form id="generateForm" action="#">
		<div id="configHeader">
			<a id="searchConfigShowHide" href="#">Search Options <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
			<div id="searchConfigOptions" class="expanded">
				<div id="licenseSection" class="configSection">
					<a class="sectionLabel" href="#">Licenses to Search <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<div id="licenseForm">Loading license types from Flickr...</div>
					</div>
				</div>
				<div id="safeSearch" class="configSection">
					<a class="sectionLabel" href="#">Safe Search <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="radio" id="safeSearchSafe" name="safeSearch" checked="checked" value="safe"> <label for="safeSearchSafe">Safe</label><br>
						<input type="radio" id="safeSearchModerate" name="safeSearch" value="moderate"> <label for="safeSearchModerate">Moderate</label><br>
						<input type="radio" id="safeSearchRestricted" name="safeSearch" value="restricted"> <label for="safeSearchRestricted">Restricted</label>
					</div>
				</div>
				<div id="dateTypeChooser" class="configSection">
					<a class="sectionLabel" href="#">Date Range <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="radio" id="randomDate" name="dateType" checked="checked" value="random"> <label for="randomDate">Use Random Dates</label><br>
						<input type="radio" id="chooseDate" name="dateType" value="choose"> <label for="chooseDate">Choose Own Dates</label>
						<div id="dateChooser">
							<table border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td colspan="3" style="padding: 20px 0 0;">
										<label for="startDateBox">Start Date and Time:</label>
									</td>
								</tr>
								<tr>
									<td>
										<input type="text" id="startDateBox">
									</td>
									<td>
										<select id="startTimeDD">
											<option value="00" selected="selected">12 AM</option>
											<option value="01">1 AM</option>
											<option value="02">2 AM</option>
											<option value="03">3 AM</option>
											<option value="04">4 AM</option>
											<option value="05">5 AM</option>
											<option value="06">6 AM</option>
											<option value="07">7 AM</option>
											<option value="08">8 AM</option>
											<option value="09">9 AM</option>
											<option value="10">10 AM</option>
											<option value="11">11 AM</option>
											<option value="12">12 PM</option>
											<option value="13">1 PM</option>
											<option value="14">2 PM</option>
											<option value="15">3 PM</option>
											<option value="16">4 PM</option>
											<option value="17">5 PM</option>
											<option value="18">6 PM</option>
											<option value="19">7 PM</option>
											<option value="20">8 PM</option>
											<option value="21">9 PM</option>
											<option value="22">10 PM</option>
											<option value="23">11 PM</option>
										</select>
									</td>
									<td>
										<select id="startTimeMinDD">
											<option value="00" selected="selected">:00</option>
											<option value="01">:01</option>
											<option value="02">:02</option>
											<option value="03">:03</option>
											<option value="04">:04</option>
											<option value="05">:05</option>
											<option value="06">:06</option>
											<option value="07">:07</option>
											<option value="08">:08</option>
											<option value="09">:09</option>
											<option value="10">:10</option>
											<option value="11">:11</option>
											<option value="12">:12</option>
											<option value="13">:13</option>
											<option value="14">:14</option>
											<option value="15">:15</option>
											<option value="16">:16</option>
											<option value="17">:17</option>
											<option value="18">:18</option>
											<option value="19">:19</option>
											<option value="20">:20</option>
											<option value="21">:21</option>
											<option value="22">:22</option>
											<option value="23">:23</option>
											<option value="24">:24</option>
											<option value="25">:25</option>
											<option value="26">:26</option>
											<option value="27">:27</option>
											<option value="28">:28</option>
											<option value="29">:29</option>
											<option value="30">:30</option>
											<option value="31">:31</option>
											<option value="32">:32</option>
											<option value="33">:33</option>
											<option value="34">:34</option>
											<option value="35">:35</option>
											<option value="36">:36</option>
											<option value="37">:37</option>
											<option value="38">:38</option>
											<option value="39">:39</option>
											<option value="40">:40</option>
											<option value="41">:41</option>
											<option value="42">:42</option>
											<option value="43">:43</option>
											<option value="44">:44</option>
											<option value="45">:45</option>
											<option value="46">:46</option>
											<option value="47">:47</option>
											<option value="48">:48</option>
											<option value="49">:49</option>
											<option value="50">:50</option>
											<option value="51">:51</option>
											<option value="52">:52</option>
											<option value="53">:53</option>
											<option value="54">:54</option>
											<option value="55">:55</option>
											<option value="56">:56</option>
											<option value="57">:57</option>
											<option value="58">:58</option>
											<option value="59">:59</option>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="3" style="padding: 20px 0 0;">
										<label for="endDateBox">End Date and Time:</label>
									</td>
								</tr>
								<tr>
									<td>
										<input type="text" id="endDateBox">
									</td>
									<td>
										<select id="endTimeDD">
											<option value="00" selected="selected">12 AM</option>
											<option value="01">1 AM</option>
											<option value="02">2 AM</option>
											<option value="03">3 AM</option>
											<option value="04">4 AM</option>
											<option value="05">5 AM</option>
											<option value="06">6 AM</option>
											<option value="07">7 AM</option>
											<option value="08">8 AM</option>
											<option value="09">9 AM</option>
											<option value="10">10 AM</option>
											<option value="11">11 AM</option>
											<option value="12">12 PM</option>
											<option value="13">1 PM</option>
											<option value="14">2 PM</option>
											<option value="15">3 PM</option>
											<option value="16">4 PM</option>
											<option value="17">5 PM</option>
											<option value="18">6 PM</option>
											<option value="19">7 PM</option>
											<option value="20">8 PM</option>
											<option value="21">9 PM</option>
											<option value="22">10 PM</option>
											<option value="23">11 PM</option>
										</select>
									</td>
									<td>
										<select id="endTimeMinDD">
											<option value="00" selected="selected">:00</option>
											<option value="01">:01</option>
											<option value="02">:02</option>
											<option value="03">:03</option>
											<option value="04">:04</option>
											<option value="05">:05</option>
											<option value="06">:06</option>
											<option value="07">:07</option>
											<option value="08">:08</option>
											<option value="09">:09</option>
											<option value="10">:10</option>
											<option value="11">:11</option>
											<option value="12">:12</option>
											<option value="13">:13</option>
											<option value="14">:14</option>
											<option value="15">:15</option>
											<option value="16">:16</option>
											<option value="17">:17</option>
											<option value="18">:18</option>
											<option value="19">:19</option>
											<option value="20">:20</option>
											<option value="21">:21</option>
											<option value="22">:22</option>
											<option value="23">:23</option>
											<option value="24">:24</option>
											<option value="25">:25</option>
											<option value="26">:26</option>
											<option value="27">:27</option>
											<option value="28">:28</option>
											<option value="29">:29</option>
											<option value="30">:30</option>
											<option value="31">:31</option>
											<option value="32">:32</option>
											<option value="33">:33</option>
											<option value="34">:34</option>
											<option value="35">:35</option>
											<option value="36">:36</option>
											<option value="37">:37</option>
											<option value="38">:38</option>
											<option value="39">:39</option>
											<option value="40">:40</option>
											<option value="41">:41</option>
											<option value="42">:42</option>
											<option value="43">:43</option>
											<option value="44">:44</option>
											<option value="45">:45</option>
											<option value="46">:46</option>
											<option value="47">:47</option>
											<option value="48">:48</option>
											<option value="49">:49</option>
											<option value="50">:50</option>
											<option value="51">:51</option>
											<option value="52">:52</option>
											<option value="53">:53</option>
											<option value="54">:54</option>
											<option value="55">:55</option>
											<option value="56">:56</option>
											<option value="57">:57</option>
											<option value="58">:58</option>
											<option value="59">:59</option>
										</select>
									</td>
								</tr>
							</table>
							
						</div>
					</div>
				</div>
				<div id="textTagChooser" class="configSection">
					<a class="sectionLabel" href="#">Text Search (optional) <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="text" id="textTagBox"> <input type="button" value="Random Word" id="randomWord"> <input type="button" value="Clear Box" id="clearWordBox">
					</div>
				</div>
				<div id="useridChooser" class="configSection">
					<a class="sectionLabel" href="#">User ID (optional - leave blank to search all users)<div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="text" id="useridBox">
						<input type="button" value="Clear Userid" id="clearUseridBox">
					</div>
				</div>
				<div id="colorChooser" class="configSection">
					<a class="sectionLabel" href="#">Colors (optional) <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<a href="#" title="Pale Pink" id="palePinkLink" class="colorLink unchecked" data-flickr-id="b">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Pink" id="pinkLink" class="colorLink unchecked" data-flickr-id="a">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Red" id="redLink" class="colorLink unchecked" data-flickr-id="0">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Dark Orange" id="darkOrangeLink" class="colorLink unchecked" data-flickr-id="1">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Orange" id="orangeLink" class="colorLink unchecked" data-flickr-id="2">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Lemon Yellow" id="lemonYellowLink" class="colorLink unchecked" data-flickr-id="4">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="School Bus Yellow" id="schoolBusYellowLink" class="colorLink unchecked" data-flickr-id="3">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Green" id="greenLink" class="colorLink unchecked" data-flickr-id="5">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Dark Lime Green" id="darkLimeGreenLink" class="colorLink unchecked" data-flickr-id="6">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Cyan" id="cyanLink" class="colorLink unchecked" data-flickr-id="7">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Blue" id="blueLink" class="colorLink unchecked" data-flickr-id="8">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Violet" id="violetLink" class="colorLink unchecked" data-flickr-id="9">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="White" id="whiteLink" class="colorLink unchecked" data-flickr-id="c">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Gray" id="grayLink" class="colorLink unchecked" data-flickr-id="d">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						<a href="#" title="Black" id="blackLink" class="colorLink unchecked" data-flickr-id="e">
							<div class="colorBoxCheck">x</div>
							<div class="colorBoxEmpty">&nbsp;</div>
						</a>
						&nbsp;<input type="button" id="clearColors" value="Clear Color Choices">
					</div>
				</div>
				<div id="styleChooser" class="configSection">
					<a class="sectionLabel" href="#">Styles (optional) <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<div><input type="checkbox" id="style-blackandwhite" value="blackandwhite"> <label for="style-blackandwhite">Black and White</label></div>
						<div><input type="checkbox" id="style-depthoffield" value="depthoffield"> <label for="style-depthoffield">Depth of Field</label></div>
						<div><input type="checkbox" id="style-minimalism" value="minimalism"> <label for="style-minimalism">Minimalism</label></div>
						<div><input type="checkbox" id="style-pattern" value="pattern"> <label for="style-pattern">Pattern</label></div>
					</div>
				</div>
				<div id="orientationChooser" class="configSection">
					<a class="sectionLabel" href="#">Orientations <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<div><input type="checkbox" id="ori-landscape" value="landscape"> <label for="ori-landscape">Landscape</label></div>
						<div><input type="checkbox" id="ori-portrait" value="portrait"> <label for="ori-portrait">Portrait</label></div>
						<div><input type="checkbox" id="ori-square" value="square"> <label for="ori-square">Square</label></div>
						<div><input type="checkbox" id="ori-panorama" value="panorama"> <label for="ori-panorama">Panorama</label></div>
					</div>
				</div>
				<div id="sizeChooser" class="configSection">
					<a class="sectionLabel" href="#">Minimum Size (optional) <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<div><input type="text" id="size-width"> <label for="size-width">px wide</label></div>
						<div><input type="text" id="size-height"> <label for="size-height">px tall</label></div>
					</div>
				</div>
				<div id="mediaTypeChooser" class="configSection">
					<a class="sectionLabel" href="#">Media Type <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<div><input type="radio" id="media-all" name="mediaRadio" value="all" checked="checked"> <label for="media-all">All</label></div>
						<div><input type="radio" id="media-photos" name="mediaRadio" value="photos"> <label for="media-photos">Photos</label></div>
						<div><input type="radio" id="media-videos" name="mediaRadio" value="videos"> <label for="media-videos">Videos</label></div>
					</div>
				</div>
			</div>
			<a id="displayConfigShowHide" href="#">RFP Display Options <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
			<div id="displayConfigOptions" class="expanded">
				<div id="imageSize" class="configSection">
					<a class="sectionLabel" href="#">Image Display Size <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="radio" id="largeDisplaySize" name="imageDisplaySize" checked="checked" value="large"> <label for="largeDisplaySize">Large</label><br>
						<input type="radio" id="mediumDisplaySize" name="imageDisplaySize" value="medium"> <label for="mediumDisplaySize">Medium</label><br>
						<input type="radio" id="smallDisplaySize" name="imageDisplaySize" value="small"> <label for="smallDisplaySize">Small</label>
					</div>
				</div>
				<div id="selectionType" class="configSection">
					<a class="sectionLabel" href="#">Selection Type <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="radio" id="selectRandom" name="selectionType" checked="checked" value="random"> <label for="selectRandom">Random Images</label><br>
						<input type="radio" id="selectFirst" name="selectionType" value="first"> <label for="selectFirst">First Available Images</label>
					</div>
				</div>
				<div id="imageNumbers" class="configSection">
					<a class="sectionLabel" href="#">Number of Images <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
					<div class="sectionContent">
						<input type="radio" id="num1" name="numImages" checked="checked" value="1"> <label for="num1">1 Image</label><br>
						<input type="radio" id="num10" name="numImages" value="10"> <label for="num10">10 Images</label><br>
						<input type="radio" id="numX" name="numImages" value="X"> <label for="numX"><input type="text" maxlength="3" size="3" placeholder="100" id="numImagesBox"> Images (max 100)</label>
					</div>
				</div>
			</div>
			<a id="addlInfoShowHide" href="#">Additional Information <div class="downArrow">▼</div><div class="upArrow">▲</div></a>
			<div id="addlInfoContent">
				<p>This tool works by selecting a random period of time, and then looking for images within that period.</p>
				<p>Usage rights are the responsibility of the user to verify.</p>
				<p>Questions? Comments? Suggestions? Bugs? <a href="#" id="emailMe">Email me.</a></p>
			</div>
		</div><!-- end #configHeader -->
		</form>
		</div><!-- end #col1 -->
		<div id="col2">
			<div id="buttonsRight">
				<div id="generateButtons">
					<a href="#" id="getImages">Get Images</a>
				</div><!-- end #generateButtons -->
				<div id="imageDownloadLink">
					<a href="#" id="downloadImages">Show All Displayed Images in Full Size</a>
				</div>
				<div class="clearButtonHolder">
					<a href="#" id="clearImages">Clear Images</a>
				</div>
			</div>
			<div id="imageHolder"></div>
		</div><!-- end #col2 -->
		</div><!-- end #colHolder -->
	</div>
	</div><!-- end #outerContainer -->
</body>
</html>
