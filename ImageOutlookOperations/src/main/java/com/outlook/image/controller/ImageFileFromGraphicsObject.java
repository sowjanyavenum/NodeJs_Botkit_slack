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

public class ImageFileFromGraphicsObject {
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

		g2d.setColor(Color.black);
		g2d.fillRect(10, 90, 70, 60);
		// for label source
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.white);
		g2d.drawString(inputParam1, 15, 125);

		// create a line from source to EAI
		g2d.setColor(Color.BLACK);
		Stroke stroke = new BasicStroke(3f);
		g2d.setStroke(stroke);
		g2d.drawLine(80, 120, 130, 120);

		// arrow
		g2d.setFont(new Font("", Font.BOLD, 18));
		g2d.setColor(Color.black);
		g2d.drawString(">", 110, 126);
	}

	// create EAI block
	public void EAI(Graphics2D g2d, String inputParam9) {
		g2d.setColor(Color.GREEN);
		g2d.fillRect(120, 95, 65, 55);
		// for label EAI
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam9, 125, 125);
		// create a line from EAI
		g2d.setColor(Color.BLACK);
		g2d.drawLine(180, 120, 200, 120);
		// create a line from EAI to down
		g2d.setColor(Color.BLACK);
		g2d.drawLine(200, 120, 200, 150);
		g2d.setFont(new Font("", Font.BOLD, 20));
		g2d.setColor(Color.black);
		g2d.drawString("v", 195, 150);
		// arrow
		g2d.setColor(Color.BLACK);
		g2d.drawLine(300, 120, 220, 120);
		// arrow
		g2d.setFont(new Font("", Font.BOLD, 22));
		g2d.setColor(Color.black);
		g2d.drawString("^", 214, 155);
		// black
		g2d.setColor(Color.BLACK);
		g2d.drawLine(430, 120, 380, 120);
		// white
		g2d.setColor(Color.BLACK);
		g2d.drawLine(220, 120, 220, 150);
	}

	public void EAI1(Graphics2D g2d, String inputParam9) {
		// for label EAI
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam9, 125, 136);
	}

	// sappi reciever
	public void sappiReciever(Graphics2D g2d, String inputParam2) {
		g2d.setColor(Color.BLACK);
		float[] dashingPattern2 = { 2f, 2f };
		Stroke stroke2 = new BasicStroke(2f, BasicStroke.CAP_BUTT, BasicStroke.JOIN_MITER, 1.0f, dashingPattern2, 2.0f);
		g2d.setStroke(stroke2);
		g2d.drawLine(232, 50, 232, 120);
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam2, 180, 30);

	}

	public void sappiReciever1(Graphics2D g2d, String inputParam2) {
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam2, 180, 45);

	}

	// sappi
	public void sapPi(Graphics2D g2d, String inputParam3) {
		g2d.setColor(Color.orange);
		g2d.fillRect(250, 80, 155, 115);
		// text
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam3, 360, 95);

	}

	// pr-1
	public void pr1(Graphics2D g2d, String inputParam4) throws IOException {
		g2d.setColor(Color.white);
		g2d.fillRect(260, 98, 135, 85);

		ImageFileFromGraphicsObject img = new ImageFileFromGraphicsObject();
		listbuffer = img.buffer();
		// text PR-1
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam4, 355, 115);
		g2d.drawImage(listbuffer.get(1), 280, 105, 45, 45, null);
	}

	// text iflow name
	public void iflow(Graphics2D g2d, String inputParam5) {
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam5, 265, 165);
	}

	public void iflow1(Graphics2D g2d, String inputParam5) {
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam5, 265, 180);
	}

	// gateway
	public void gateway(Graphics2D g2d, String inputParam6) throws IOException {
		ImageFileFromGraphicsObject img = new ImageFileFromGraphicsObject();
		listbuffer = img.buffer();
		g2d.setColor(Color.blue);
		g2d.fillOval(180, 150, 65, 65);
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.white);
		g2d.drawString(inputParam6, 190, 200);
		g2d.drawImage(listbuffer.get(2), 197, 160, 30, 30, null);
	}

	// sapSender
	public void sapSender(Graphics2D g2d, String inputParam7) {
		g2d.setColor(Color.BLACK);
		float[] dashingPattern1 = { 2f, 2f };
		Stroke stroke1 = new BasicStroke(2f, BasicStroke.CAP_BUTT, BasicStroke.JOIN_MITER, 1.0f, dashingPattern1, 2.0f);
		// sap sender
		g2d.setStroke(stroke1);
		g2d.drawLine(418, 50, 418, 120);

		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam7, 380, 30);
	}

	public void sapSender1(Graphics2D g2d, String inputParam7) {
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.blue);
		g2d.drawString(inputParam7, 330, 45);
	}

	// ECC
	public void ECC(Graphics2D g2d, String inputParam8) throws IOException {
		ImageFileFromGraphicsObject img = new ImageFileFromGraphicsObject();
		listbuffer = img.buffer();
		g2d.setColor(Color.CYAN);
		g2d.fillRect(430, 95, 60, 50);
		g2d.setFont(new Font("", Font.BOLD, 14));
		g2d.setColor(Color.black);
		g2d.drawString(inputParam8, 440, 126);
		g2d.drawImage(listbuffer.get(0), 435, 98, 20, 15, null);
	}

	// text queue name
	public void queue(Graphics2D g2d, String inputParam9, String inputParam10) {
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString("Queue Name:  " + inputParam9, 175, 230);
		// text queue Manager name
		g2d.setFont(new Font("", Font.BOLD, 11));
		g2d.setColor(Color.black);
		g2d.drawString("Queue Manager Name:  " + inputParam10, 175, 245);
	}

	// Images saves here
	public void saveImg(String imageName) throws IOException {
		// Save as PNG

		// File file = new
		// File("C:\\Users\\bhatt\\Desktop\\img\\"+imageName+".png");
		File file = new File(imageName + ".png");
		ImageIO.write(bufferedImage, "png", file);
		System.out.println("Imaged saved....");
		// Save as JPEG

		/*
		 * file = new File("/Users/venum/Desktop/8293.jpg");
		 * ImageIO.write(bufferedImage, "jpg", file);
		 * System.out.println("Done");
		 */

	}

	// main

	public static String createImage(String source, String target, String interfaceName, String eaiName,
			String iFlowName, String senderCCName, String recieverCCName, String queueName, String queueManagerName,
			String serverName, String environmentName) throws IOException {
		ImageFileFromGraphicsObject imageFileFromGraphicsObject = new ImageFileFromGraphicsObject();
		Graphics2D g2d = imageFileFromGraphicsObject.getG2D();
		imageFileFromGraphicsObject.whiteBlock(g2d);
		imageFileFromGraphicsObject.source(g2d, source);
		if (eaiName.length() > 6) {
			imageFileFromGraphicsObject.EAI(g2d, eaiName.substring(0, 6));
			imageFileFromGraphicsObject.EAI1(g2d, eaiName.substring(6));
		} else {
			imageFileFromGraphicsObject.EAI(g2d, eaiName);
		}

		if (recieverCCName.length() > 17) {
			imageFileFromGraphicsObject.sappiReciever(g2d, recieverCCName.substring(0, 17));
			imageFileFromGraphicsObject.sappiReciever1(g2d, recieverCCName.substring(17));
		} else {
			imageFileFromGraphicsObject.sappiReciever(g2d, recieverCCName);
		}
		imageFileFromGraphicsObject.buffer();
		imageFileFromGraphicsObject.sapPi(g2d, "SAP PI");
		imageFileFromGraphicsObject.pr1(g2d, "PR-1");

		if (iFlowName.length() > 20) {
			imageFileFromGraphicsObject.iflow(g2d, iFlowName.substring(0, 20));
			imageFileFromGraphicsObject.iflow1(g2d, iFlowName.substring(20));
		} else {
			imageFileFromGraphicsObject.iflow(g2d, iFlowName);
		}
		imageFileFromGraphicsObject.gateway(g2d, "gateway");
		// imageFileFromGraphicsObject.sapSender(g2d,"SAP PI Sender
		// Channel");

		if (senderCCName.length() > 24) {
			imageFileFromGraphicsObject.sapSender(g2d, senderCCName.substring(0, 12));
			imageFileFromGraphicsObject.sapSender1(g2d, senderCCName.substring(12, 24));
		} else {
			imageFileFromGraphicsObject.sapSender(g2d, senderCCName);
		}
		imageFileFromGraphicsObject.ECC(g2d, target);
		imageFileFromGraphicsObject.queue(g2d, queueName, queueManagerName);
		String imageName = "sample" + interfaceName;
		imageFileFromGraphicsObject.saveImg(imageName);
		return imageName;

	}
}