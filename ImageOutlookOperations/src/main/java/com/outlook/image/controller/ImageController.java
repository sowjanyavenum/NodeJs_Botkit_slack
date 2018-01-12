package com.outlook.image.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;

@RestController
public class ImageController {
	@RequestMapping(value = "/createImage", method = RequestMethod.POST, produces = {
			MediaType.APPLICATION_JSON_VALUE }, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public List<String> createImage(@RequestBody ImageDetails imageDetails) {
		List<String> imageNameList = new ArrayList<String>();
		for (int i = 0; i < imageDetails.getSource().size(); i++) {
			if (imageDetails.getSource().get(i).equalsIgnoreCase("ECC")) {
				// out bound image
				try {
					String outBoundImage = OutboundImage.createReverse(imageDetails.getSource().get(i),
							imageDetails.getTarget().get(i), imageDetails.getInterfaceName().get(i),
							imageDetails.getEai().get(i), imageDetails.getiFlow().get(i),
							imageDetails.getSenderCC().get(i), imageDetails.getReceiverCC().get(i),
							imageDetails.getqName().get(i), imageDetails.getqManagerName().get(i),
							imageDetails.getServer().get(i), imageDetails.getEnvironment().get(i));
					imageNameList.add(outBoundImage);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (imageDetails.getSource().get(i).equalsIgnoreCase("Host")) {
				// Image file from graphics object
				try {
					String inBoungImage = ImageFileFromGraphicsObject.createImage(imageDetails.getSource().get(i),
							imageDetails.getTarget().get(i), imageDetails.getInterfaceName().get(i),
							imageDetails.getEai().get(i), imageDetails.getiFlow().get(i),
							imageDetails.getSenderCC().get(i), imageDetails.getReceiverCC().get(i),
							imageDetails.getqName().get(i), imageDetails.getqManagerName().get(i),
							imageDetails.getServer().get(i), imageDetails.getEnvironment().get(i));
					imageNameList.add(inBoungImage);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		// call pdf generation method...
		try {
			String pdfName = JavaPdfHelloWorld.createPDF(imageNameList, imageDetails.getInterfaceName(),
					imageDetails.getSenderCC(), imageDetails.getReceiverCC(), imageDetails.getiFlow(),
					imageDetails.getqName(), imageDetails.getqManagerName(), imageDetails.getServer(),
					imageDetails.getEnvironment());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Send EMAIL
		EWSApiDemo ews = new EWSApiDemo();
		ews.sendMsgFromEWSWithDesignPDF();
		return imageNameList;
	}

	@RequestMapping(value = "/sendMeetingRequest", method = RequestMethod.POST)
	public String sendMeetingRequestFromOutlook(@RequestBody MeetingInfo meeting) {
		System.out.println("Control Came..");
		String response = "created meeting...";
		SendMeetingRequest mr = new SendMeetingRequest();
		try {
			mr.send(meeting);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@RequestMapping("/createFile")
	public String createFileUserRoleChange() {
		String res = null;
		try {
		res = WriteLogEntriesToFile.createFile();
		} catch (Exception e) {
		// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
	
	
	@RequestMapping(value = "/deleteFile", method = RequestMethod.GET, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	public String deleteFile() {
		String res = null;
		try {
			res = DeleteFile.delete();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}

}
