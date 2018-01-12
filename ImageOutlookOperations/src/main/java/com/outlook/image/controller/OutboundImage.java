package com.outlook.image.controller;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Stroke;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;


public class OutboundImage {
	int width = 500;
	int height = 300;
	BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

	// Create a graphics which can be used to draw into the buffered image
	List<BufferedImage> listbuffer = new ArrayList<BufferedImage>();

	public Graphics2D getG2D() {
		Graphics2D g2d = bufferedImage.createGraphics();
		return g2d;
	}

	public List<BufferedImage> buffer() throws IOException {

		listbuffer.add(ImageIO.read(new File("64299656.png")));
		listbuffer.add(ImageIO.read(new File("64220702.png")));
		listbuffer.add(ImageIO.read(new File("mp.png")));
		return listbuffer;
	}

	// Constructs a BufferedImage of one of the predefined image types.
	// fill all the image with white
	public void whiteBlock(Graphics2D g2d) {
		g2d.setColor(Color.white);
		g2d.fillRect(0, 0, width, height);
	}

	// create Source block
	public void source(Graphics2D g2d, String inputParam1) {

		/*
		 * g2d.setColor(Color.black); g2d.fillRect(430, 95, 70, 60); //for label
		 * source g2d.setFont(new Font("TimesNewRoman",Font.BOLD,14));
		 * g2d.setColor(Color.white); g2d.drawString(inputParam1, 15, 125);
		 */
		g2d.setColor(Color.black);
		g2d.fillRect(420, 90, 70, 60);
		// for label source
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 14));
		g2d.setColor(Color.white);
		g2d.drawString(inputParam1, 425, 126);
		// create a line from source to EAI
		g2d.setColor(Color.BLACK);
		Stroke stroke = new BasicStroke(3f);
		g2d.setStroke(stroke);
		g2d.drawLine(80, 120, 130, 120);

		// arrow
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 18));
		g2d.setColor(Color.black);
		g2d.drawString(">", 110, 126);
	}

	public void sapPi(Graphics2D g2d, String inputParam3) {
		g2d.setColor(Color.orange);
		g2d.fillRect(120, 60, 155, 115);
		// text
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam3, 220, 73);

	}

	// pr-1
	public void pr1(Graphics2D g2d, String inputParam4) throws IOException {
		g2d.setColor(Color.white);
		g2d.fillRect(130, 75, 135, 85);

		OutboundImage img = new OutboundImage();
		listbuffer = img.buffer();
		// text PR-1
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam4, 225, 90);
		g2d.drawImage(listbuffer.get(1), 145, 85, 45, 45, null);
	}

	// text iflow name
	public void iflow(Graphics2D g2d, String inputParam5) {
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam5, 135, 145);
	}

	public void iflow1(Graphics2D g2d, String inputParam5) {
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam5, 135, 157);
	}

	// create EAI block
	public void EAI(Graphics2D g2d, String inputParam9,String inputParam10) {
		// black
		/*
		 * g2d.setColor(Color.BLACK); g2d.drawLine(430, 120, 380, 120);
		 */

		g2d.setColor(Color.GREEN);
		g2d.fillRect(340, 95, 60, 50);

		// for label EAI
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 14));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam9, 345, 115);
		g2d.drawString(inputParam10, 345, 130);
		// black
		g2d.setColor(Color.BLACK);
		g2d.drawLine(420, 120, 400, 120);

		// create a line from EAI
		g2d.setColor(Color.BLACK);
		g2d.drawLine(305, 120, 200, 120);
		// create a line from EAI to down
		g2d.setColor(Color.BLACK);
		g2d.drawLine(305, 120, 305, 150);
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 20));
		g2d.setColor(Color.black);
		g2d.drawString("v", 300, 150);

		// arrow
		g2d.setColor(Color.BLACK);
		g2d.drawLine(338, 120, 320, 120);
		// white
		g2d.setColor(Color.BLACK);
		g2d.drawLine(320, 120, 320, 150);
		// arrow
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 22));
		g2d.setColor(Color.black);
		g2d.drawString("^", 314, 155);

	}

	// sappi reciever
	public void sappiReciever(Graphics2D g2d, String inputParam2) {
		g2d.setColor(Color.BLACK);
		float[] dashingPattern2 = { 2f, 2f };
		Stroke stroke2 = new BasicStroke(2f, BasicStroke.CAP_BUTT, BasicStroke.JOIN_MITER, 1.0f, dashingPattern2, 2.0f);
		g2d.setStroke(stroke2);
		g2d.drawLine(285, 50, 285, 120);
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam2, 230, 30);

	}

	public void sappiReciever1(Graphics2D g2d, String inputParam2) {
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam2, 230, 45);

	}
	// sappi

	// gateway
	public void gateway(Graphics2D g2d, String inputParam6) throws IOException {
		OutboundImage img = new OutboundImage();
		listbuffer = img.buffer();
		g2d.setColor(Color.blue);
		g2d.fillOval(285, 150, 65, 65);
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.white);
		g2d.drawString(inputParam6, 295, 200);
		g2d.drawImage(listbuffer.get(2), 303, 160, 30, 30, null);
	}

	// sapSender
	public void sapSender(Graphics2D g2d, String inputParam7) {
		g2d.setColor(Color.BLACK);
		float[] dashingPattern1 = { 2f, 2f };
		Stroke stroke1 = new BasicStroke(2f, BasicStroke.CAP_BUTT, BasicStroke.JOIN_MITER, 1.0f, dashingPattern1, 2.0f);
		// sap sender
		g2d.setStroke(stroke1);
		g2d.drawLine(100, 50, 100, 120);

		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam7, 50, 30);
	}

	public void sapSender1(Graphics2D g2d, String inputParam7) {
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam7, 50, 45);
	}
	// ECC

	public void ECC(Graphics2D g2d, String inputParam8) throws IOException {
		OutboundImage img = new OutboundImage();
		listbuffer = img.buffer();
		g2d.setColor(Color.CYAN);
		g2d.fillRect(20, 95, 60, 50);
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam8, 35, 126);
		g2d.drawImage(listbuffer.get(0), 22, 98, 20, 15, null);
	}

	// text queue name
	public void queue(Graphics2D g2d, String inputParam9, String inputParam10) {
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString("Queue Name:  " + inputParam9, 280, 230);
		// text queue Manager name
		g2d.setFont(new Font("TimesNewRoman", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString("Queue Manager Name:  " + inputParam10, 280, 245);
	}

	// Images saves here
	public void saveImg(String imageName) throws IOException {
		// Save as PNG
		File file = new File(imageName + ".png");
		ImageIO.write(bufferedImage, "png", file);
		// Save as JPEG
		/*
		 * file = new File("/Users/venum/Desktop/8293.jpg");
		 * ImageIO.write(bufferedImage, "jpg", file);
		 */
		System.out.println("Done");
	}

	// main
	public static String createReverse(String source, String target, String interfaceName, String eaiName,
			String iFlowName, String senderCCName, String recieverCCName,
			String queueName, String queueManagerName, String serverName,
			String environmentName) throws IOException {
	
			OutboundImage image = new OutboundImage();
			Graphics2D g2d = image.getG2D();
			image.whiteBlock(g2d);
			image.source(g2d, target);
			if (eaiName.length() > 6) {
				image.EAI(g2d, eaiName.substring(0, 6),eaiName.substring(6));
				
			} else {
				image.EAI(g2d, eaiName,"");
			}
			// image.sappiReciever(g2d, "SAP PI Reciever Channel");
			if (recieverCCName.length() > 17) {
				image.sappiReciever(g2d, recieverCCName.substring(0, 17));
				image.sappiReciever1(g2d, recieverCCName.substring(17));
			} else {
				image.sappiReciever(g2d, recieverCCName);
			}
			image.buffer();
			image.sapPi(g2d, "SAP PI");
			image.pr1(g2d, "PR-1");
			if (iFlowName.length() > 20) {
				image.iflow(g2d, iFlowName.substring(0, 20));
				image.iflow1(g2d, iFlowName.substring(20));
			} else {
				image.iflow(g2d, iFlowName);
			}
			image.gateway(g2d, "gateway");
			// image.sapSender(g2d,"SAP PI Sender Channel");
			if (senderCCName.length() > 17) {
				image.sapSender(g2d, senderCCName.substring(0, 17));
				image.sapSender1(g2d, senderCCName.substring(17));
			}else{
				image.sapSender(g2d, senderCCName);
			}
			image.ECC(g2d, source);
			image.queue(g2d, queueName, queueManagerName);
			String imageName = "IMAGE" + interfaceName;
			image.saveImg(imageName);
		
		return imageName;
	}
}