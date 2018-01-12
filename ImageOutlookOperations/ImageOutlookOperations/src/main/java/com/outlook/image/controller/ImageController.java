package com.outlook.image.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.text.DocumentException;

@RestController
public class ImageController {
	/// {source}/{target}/{interface}/{eai}/{iFlow}/{senderCC}/{receiverCC}/{QName}/{QMName}/{server}/{env}
	@RequestMapping(value = "/getImageDetails", method = RequestMethod.GET)
	public String getImageDetails(@RequestParam("source") String source, @RequestParam("target") String target,
			@RequestParam("interface") String interfaceName, @RequestParam("eai") String eai,
			@RequestParam("iFlow") String iFlow, @RequestParam("senderCC") String senderCC,
			@RequestParam("receiverCC") String receiverCC, @RequestParam("QName") String QName,
			@RequestParam("QMName") String QMName, @RequestParam("server") String server,
			@RequestParam("env") String env) {
		String res = null;
		List<String> imageNameList = new ArrayList<String>();
		List<String> interfaceNameList = new ArrayList<String>();
		List<String> senderNameList = new ArrayList<String>();
		List<String> receiverNameList = new ArrayList<String>();
		List<String> iFlowNameList = new ArrayList<String>();
		List<String> queueNameList = new ArrayList<String>();
		List<String> queueManagerNameList = new ArrayList<String>();
		List<String> serverList = new ArrayList<String>();
		List<String> environmentNameList = new ArrayList<String>();

		interfaceNameList.add(interfaceName);
		senderNameList.add(senderCC);
		receiverNameList.add(receiverCC);
		iFlowNameList.add(iFlow);
		queueNameList.add(QName);
		queueManagerNameList.add(QMName);
		serverList.add(server);
		environmentNameList.add(env);
		if (source.equalsIgnoreCase("Host")) {
			try {
				String inboundImageName = ImageFileFromGraphicsObject.createImage(source, target, interfaceName, eai,
						iFlow, senderCC, receiverCC, QName, QMName, server, env);
				imageNameList.add(inboundImageName);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if (source.equalsIgnoreCase("ECC")) {
			try {
				String outboundImageName = OutboundImage.createReverse(source, target, interfaceName, eai, iFlow,
						senderCC, receiverCC, QName, QMName, server, env);
				imageNameList.add(outboundImageName);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println(interfaceNameList);
		System.out.println(senderNameList);
		System.out.println(receiverNameList);
		System.out.println(iFlowNameList);
		System.out.println(queueNameList);
		System.out.println(queueManagerNameList);
		System.out.println(serverList);
		System.out.println(environmentNameList);
		System.out.println(imageNameList);
		String outageeStatus = " At this point of time only EAI supports outage handling. Currently ECC, PI and Host are not supporting";

		try {
			res = JavaPdfHelloWorld.createPDF(imageNameList, outageeStatus, interfaceNameList, senderNameList,
					receiverNameList, iFlowNameList, queueNameList, queueManagerNameList, serverList,
					environmentNameList);
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
		return res;
	}

	/// {userid}/{userName}
	@RequestMapping(value = "/getUsers", method = RequestMethod.GET)
	public String getUserInfo(@RequestParam("userid") String userid, @RequestParam("userName") String userName) {
		return "users retrieved.." + userid + "," + userName;
	}

}
