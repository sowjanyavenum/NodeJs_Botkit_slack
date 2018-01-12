package com.outlook.image.controller;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.ListItem;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.ZapfDingbatsList;
import com.itextpdf.text.pdf.CMYKColor;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class JavaPdfHelloWorld extends PdfPageEventHelper {
	// Font bluejFont = FontFactory.getFont(FontFactory.COURIER, 18,
	// Font.BOLD,new CMYKColor(255, 0, 0, 0));
	Font blueFont = FontFactory.getFont(FontFactory.COURIER, 18, Font.BOLD, new CMYKColor(255, 0, 0, 0));
	Font blueFontTable = FontFactory.getFont(FontFactory.COURIER, 14, Font.BOLD, new CMYKColor(255, 0, 0, 0));
	Font redFont = FontFactory.getFont(FontFactory.COURIER, 18, Font.BOLD, new CMYKColor(0, 255, 0, 0));
	Font grayFont = FontFactory.getFont(FontFactory.COURIER, 10, Font.BOLD, new CMYKColor(0, 0, 0, 27));
	Font yellowFont = FontFactory.getFont(FontFactory.COURIER, 14, Font.BOLD, new CMYKColor(0, 0, 255, 0));
	Font blackFont = FontFactory.getFont(FontFactory.COURIER, 14, Font.BOLD, new CMYKColor(30, 20, 20, 100));
	Font blackFontheader = FontFactory.getFont(FontFactory.COURIER, 10, Font.NORMAL, new CMYKColor(30, 20, 20, 100));
	String descriptionInfo = "ECC system is scheduled for an upgrade on May 25, in accordance with this there will be a planned outage in ECC,"
			+ "which will be effecting the inbound and outbound transactions flowing through this system. "
			+ "During this outage all the transactions will be on hold.";

	// title page
	public Document document(Rectangle layout) {
		Document document = new Document(layout);
		return document;
	}

	public PdfWriter pdfWriter(Document document, String inputFileName)
			throws DocumentException, FileNotFoundException {
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(inputFileName));

		return writer;

	}

	public void onEndPage(PdfWriter writer, Document document) {
		Rectangle rect = writer.getBoxSize("art");
		PdfContentByte cb = writer.getDirectContent();
		cb.rectangle(50, 100, 450, 665);
		cb.stroke();
		ColumnText.showTextAligned(writer.getDirectContent(), Element.ALIGN_LEFT,
				new Phrase(String.valueOf(writer.getPageNumber()), blackFont), rect.getRight() / 2,
				rect.getBottom() + 35, 0);
	}

	public void title(Document document, String title, String imageName, String image)
			throws DocumentException, MalformedURLException, IOException {

		Chunk underline = new Chunk(title, blueFont);

		underline.setUnderline(1f, -2f);
		Paragraph paraSpace = new Paragraph();
		for (int i = 0; i < 15; i++) {
			paraSpace.add("\n");
		}
		document.add(paraSpace);
		Paragraph paragraphTitle = new Paragraph(underline);

		paragraphTitle.setAlignment(Element.ALIGN_CENTER);
		paragraphTitle.add("                          -By Process Administrator");
		document.add(paragraphTitle);
		document.add(new Paragraph(imageName)); // Add Image Image image1 =
		Image image1 = Image.getInstance(image);
		image1.scaleAbsolute(40, 40);
		image1.setAlignment(Element.ALIGN_MIDDLE); // Add to document
		document.add(image1);

	}

	public void index(Document document) throws DocumentException {
		Chunk underline = new Chunk("Table of Contents", blueFont);

		underline.setUnderline(1f, -2f);
		Paragraph paragraphOne = new Paragraph(underline);
		paragraphOne.setIndentationLeft(40);
		document.add(paragraphOne);
		paragraphOne.add("\n");
		ZapfDingbatsList zapfDingbatsList = new ZapfDingbatsList(43, 46);
		// zapfDingbatsList.set
		zapfDingbatsList.add(new ListItem("Description"));
		zapfDingbatsList.add(new ListItem("Implementation plan"));
		zapfDingbatsList.add(new ListItem("System Capability"));
		zapfDingbatsList.add(new ListItem("Areas Effected"));
		// zapfDingbatsList.add(new ListItem("Conclusion"));
		zapfDingbatsList.setIndentationLeft(40);
		document.add(zapfDingbatsList);

	}

	public void context(Document document, String indexName, java.util.List<String> imageNameList,
			java.util.List<String> interfaceNameList, java.util.List<String> senderNameList,
			java.util.List<String> receiverNameList, java.util.List<String> iFlowNameList,
			java.util.List<String> queueNameList, java.util.List<String> queueManagerNameList,
			java.util.List<String> serverNameList, java.util.List<String> environmentNameList)
			throws DocumentException, MalformedURLException, IOException {

		Chunk underline = new Chunk(indexName, blueFont);

		underline.setUnderline(1f, -2f);
		Paragraph paragraphOne = new Paragraph(underline);
		paragraphOne.setIndentationLeft(15);
		paragraphOne.add("\n");
		document.add(paragraphOne);

		for (int i = 0; i < imageNameList.size(); i++) {
			String image = imageNameList.get(i) + ".png";

			Paragraph subHeading1 = new Paragraph(i + 1 + ".1 Interface Name : " + interfaceNameList.get(i), blackFont);

			subHeading1.setIndentationLeft(25);
			document.add(subHeading1);
			Paragraph paragraphOneWork = new Paragraph(i + 1 + ".1.1 WorkFlow", blackFont);
			paragraphOneWork.setIndentationLeft(35);
			document.add(paragraphOneWork);
			// document.add(new Paragraph(imageName,blueFont));
			// Add Image
			Image image1 = Image.getInstance(image);
			image1.scaleAbsolute(400, 280);
			image1.setAlignment(Element.ALIGN_CENTER);
			// Add to document
			document.add(image1);

			Paragraph paragraphOne3 = new Paragraph(i + 1 + ".1.2 Configuration Details", blackFont);
			paragraphOne3.setIndentationLeft(35);
			document.add(paragraphOne3);

			PdfPTable table = new PdfPTable(2); // 3 columns.
			table.setWidthPercentage(85); // Width 100%
			table.setSpacingBefore(20f); // Space before table
			table.setSpacingAfter(10f); // Space after tabl
			// table.s
			// Set Column widths
			float[] columnWidths = { 1f, 3f };
			table.setWidths(columnWidths);

			PdfPCell cell1 = new PdfPCell(new Paragraph("Object Type"));
			cell1.setBorderColor(BaseColor.BLACK);
			cell1.setPaddingLeft(20);
			cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell2 = new PdfPCell(new Paragraph("Object Details"));
			cell2.setBorderColor(BaseColor.BLACK);
			cell2.setPaddingLeft(30);
			cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell3 = new PdfPCell(new Paragraph("Sender Channel"));
			cell3.setBorderColor(BaseColor.BLACK);
			cell3.setPaddingLeft(10);
			cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell3.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell4 = new PdfPCell(new Paragraph(senderNameList.get(i)));
			cell4.setBorderColor(BaseColor.BLACK);
			cell4.setPaddingLeft(15);
			cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell4.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell5 = new PdfPCell(new Paragraph("Reciver Channel"));
			cell5.setBorderColor(BaseColor.BLACK);
			cell5.setPaddingLeft(10);
			cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell5.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell6 = new PdfPCell(new Paragraph(receiverNameList.get(i)));
			cell6.setBorderColor(BaseColor.BLACK);
			cell6.setPaddingLeft(15);
			cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell6.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell7 = new PdfPCell(new Paragraph("Queue Name"));
			cell7.setBorderColor(BaseColor.BLACK);
			cell7.setPaddingLeft(10);
			cell7.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell7.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell8 = new PdfPCell(new Paragraph(queueNameList.get(i)));
			cell8.setBorderColor(BaseColor.BLACK);
			cell8.setPaddingLeft(15);
			cell8.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell8.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell9 = new PdfPCell(new Paragraph("Queue Manager Name"));
			cell9.setBorderColor(BaseColor.BLACK);
			cell9.setPaddingLeft(10);
			cell9.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell9.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell10 = new PdfPCell(new Paragraph(queueManagerNameList.get(i)));
			cell10.setBorderColor(BaseColor.BLACK);
			cell10.setPaddingLeft(15);
			cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell10.setVerticalAlignment(Element.ALIGN_MIDDLE);
			PdfPCell cell11 = new PdfPCell(new Paragraph("Iflow Name"));
			cell11.setBorderColor(BaseColor.BLACK);
			cell11.setPaddingLeft(10);
			cell11.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell11.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell12 = new PdfPCell(new Paragraph(iFlowNameList.get(i)));
			cell12.setBorderColor(BaseColor.BLACK);
			cell12.setPaddingLeft(15);
			cell12.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell12.setVerticalAlignment(Element.ALIGN_MIDDLE);
			PdfPCell cell13 = new PdfPCell(new Paragraph("PI Server Name"));
			cell13.setBorderColor(BaseColor.BLACK);
			cell13.setPaddingLeft(10);
			cell13.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell13.setVerticalAlignment(Element.ALIGN_MIDDLE);

			PdfPCell cell14 = new PdfPCell(new Paragraph(serverNameList.get(i)));
			cell14.setBorderColor(BaseColor.BLACK);
			cell14.setPaddingLeft(15);
			cell14.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell14.setVerticalAlignment(Element.ALIGN_MIDDLE);

			// To avoid having the cell border and the content overlap, if you
			// are
			// having thick cell borders
			// cell1.setUserBorderPadding(true);
			// cell2.setUserBorderPadding(true);
			// cell3.setUserBorderPadding(true);

			table.addCell(cell1);
			table.addCell(cell2);
			table.addCell(cell3);
			table.addCell(cell4);
			table.addCell(cell5);
			table.addCell(cell6);
			table.addCell(cell7);
			table.addCell(cell8);
			table.addCell(cell9);
			table.addCell(cell10);
			table.addCell(cell11);
			table.addCell(cell12);
			table.addCell(cell13);
			table.addCell(cell14);

			document.add(table);
			document.newPage();
		}

	}

	public void outagee(Document document, String startTime) throws DocumentException {

		/*
		 * Chunk underline = new Chunk(outageePlanName, blueFont);
		 * 
		 * underline.setUnderline(1f, -2f); Paragraph paragraphOne = new
		 * Paragraph(underline); paragraphOne.setIndentationLeft(15); //
		 * paragraphOne.add("\n"); document.add(paragraphOne);
		 */

		// document.add(new Paragraph(conclusion,redFont));
		Chunk underline = new Chunk("1.Description", blueFont);
		underline.setUnderline(1f, -2f);
		Paragraph paragraphOne2 = new Paragraph(underline);

		// Paragraph paragraphOne = new Paragraph();
		paragraphOne2.setIndentationLeft(15);
		document.add(paragraphOne2);
		Paragraph paragraphOne1 = new Paragraph(descriptionInfo);
		// Paragraph paragraphOne = new Paragraph();
		paragraphOne1.setIndentationLeft(30);
		document.add(paragraphOne1);
		// Implementation plan:
		Chunk underline1 = new Chunk("2.Implementation Plan", blueFont);
		underline1.setUnderline(1f, -2f);
		Paragraph paragraphOne4 = new Paragraph(underline1);

		paragraphOne4.setIndentationLeft(15);
		document.add(paragraphOne4);
		// paragraphOne4.add("\n");

		String Step1 = "All the concerned parties will be notified..";
		String Step2 = "Upgrade starts at" + startTime;
		String Step3 = "EAI job will be triggered to hold the transaction in EAI";
		String Step4 = "Process Administrator will kick off the upgrade.";
		String Step5 = "ECC upgrade starts.";
		String Step6 = "ECC upgrade ends.";
		String Step7 = "EAI job will be triggered to release the transactions.";
		String Step8 = "All the parties will be notified back.";

		// Paragraph paragraphOne1 = new Paragraph(outageePlan.toString());
		// Paragraph paragraphOne = new Paragraph();
		Paragraph paragraphOne5 = new Paragraph("Step 1 :\n", blackFont);
		Paragraph Step1Content = new Paragraph(Step1);
		paragraphOne5.setIndentationLeft(40);
		Step1Content.setIndentationLeft(50);

		// paragraphOne5.add("\n");
		document.add(paragraphOne5);
		document.add(Step1Content);
		Paragraph paragraphOne6 = new Paragraph("Step 2 : ", blackFont);
		Paragraph Step2Content = new Paragraph(Step2);
		paragraphOne6.setIndentationLeft(40);
		Step2Content.setIndentationLeft(50);
		document.add(paragraphOne6);
		document.add(Step2Content);
		Paragraph paragraphOne7 = new Paragraph("Step 3 :", blackFont);
		Paragraph Step3Content = new Paragraph(Step3);
		paragraphOne7.setIndentationLeft(40);
		Step3Content.setIndentationLeft(50);
		document.add(paragraphOne7);
		document.add(Step3Content);
		Paragraph paragraphOne8 = new Paragraph("Step 4 :", blackFont);
		Paragraph Step4Content = new Paragraph(Step4);
		paragraphOne8.setIndentationLeft(40);
		Step4Content.setIndentationLeft(50);
		document.add(paragraphOne8);
		document.add(Step4Content);
		Paragraph paragraphOne9 = new Paragraph("Step 5 :", blackFont);
		Paragraph Step5Content = new Paragraph(Step5);
		paragraphOne9.setIndentationLeft(40);
		Step5Content.setIndentationLeft(50);
		document.add(paragraphOne9);
		document.add(Step4Content);
		Paragraph paragraphOne10 = new Paragraph("Step 6 :", blackFont);
		Paragraph Step6Content = new Paragraph(Step6);
		paragraphOne10.setIndentationLeft(40);
		Step6Content.setIndentationLeft(50);
		document.add(paragraphOne10);
		document.add(Step6Content);
		Paragraph paragraphOne11 = new Paragraph("Step 7 :", blackFont);
		Paragraph Step7Content = new Paragraph(Step7);
		paragraphOne11.setIndentationLeft(40);
		Step7Content.setIndentationLeft(50);
		document.add(paragraphOne11);
		document.add(Step7Content);
		Paragraph paragraphOne12 = new Paragraph("Step 8 :", blackFont);
		Paragraph Step8Content = new Paragraph(Step8);
		paragraphOne12.setIndentationLeft(40);
		Step8Content.setIndentationLeft(50);
		document.add(paragraphOne12);
		document.add(Step8Content);
		Chunk underline2 = new Chunk("3.System Capabilities", blueFont);
		underline2.setUnderline(1f, -2f);
		Paragraph paragraphOne3 = new Paragraph(underline2);
		paragraphOne3.setIndentationLeft(15);
		document.add(paragraphOne3);

		PdfPTable table = new PdfPTable(2); // 3 columns.
		table.setWidthPercentage(80); // Width 100%
		table.setSpacingBefore(20f); // Space before table
		table.setSpacingAfter(10f); // Space after tabl
		// Set Column widths
		float[] columnWidths = { 0.2f, 0.2f };
		table.setWidths(columnWidths);

		PdfPCell cell1 = new PdfPCell(new Paragraph("Application Type"));
		cell1.setBorderColor(BaseColor.BLACK);
		cell1.setPaddingLeft(10);
		cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell2 = new PdfPCell(new Paragraph("Outagee Handling Capability"));
		cell2.setBorderColor(BaseColor.BLACK);
		cell2.setPaddingLeft(10);
		cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell2.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell3 = new PdfPCell(new Paragraph("ECC"));
		cell3.setBorderColor(BaseColor.BLACK);
		cell3.setPaddingLeft(10);
		cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell3.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell4 = new PdfPCell(new Paragraph("NO"));
		cell4.setBorderColor(BaseColor.BLACK);
		cell4.setPaddingLeft(50);
		cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell4.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell5 = new PdfPCell(new Paragraph("Host"));
		cell5.setBorderColor(BaseColor.BLACK);
		cell5.setPaddingLeft(10);
		cell5.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell5.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell6 = new PdfPCell(new Paragraph("NO"));
		cell6.setBorderColor(BaseColor.BLACK);
		cell6.setPaddingLeft(50);
		cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell6.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell7 = new PdfPCell(new Paragraph("EAI"));
		cell7.setBorderColor(BaseColor.BLACK);
		cell7.setPaddingLeft(10);
		cell7.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell7.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell8 = new PdfPCell(new Paragraph("YES"));
		cell8.setBorderColor(BaseColor.BLACK);
		cell8.setPaddingLeft(50);
		cell8.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell8.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell9 = new PdfPCell(new Paragraph("PI"));
		cell9.setBorderColor(BaseColor.BLACK);
		cell9.setPaddingLeft(10);
		cell9.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell9.setVerticalAlignment(Element.ALIGN_MIDDLE);

		PdfPCell cell10 = new PdfPCell(new Paragraph("NO"));
		cell10.setBorderColor(BaseColor.BLACK);
		cell10.setPaddingLeft(50);
		cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell10.setVerticalAlignment(Element.ALIGN_MIDDLE);

		table.addCell(cell1);
		table.addCell(cell2);
		table.addCell(cell3);
		table.addCell(cell4);
		table.addCell(cell5);
		table.addCell(cell6);
		table.addCell(cell7);
		table.addCell(cell8);
		table.addCell(cell9);
		table.addCell(cell10);

		document.add(table);

	}

	public void conclusion(Document document, String conclusion) throws DocumentException {
		Chunk underline = new Chunk(conclusion, blueFont);
		underline.setUnderline(1f, -2f);
		Paragraph paragraphOne = new Paragraph(underline);
		paragraphOne.setIndentationLeft(15);
		paragraphOne.add("\n");

		document.add(paragraphOne);

		String Step1 = "Enter Step 1 here..";
		String Step2 = "Enter Step 2 here..";

		// Paragraph paragraphOne1 = new Paragraph(outageePlan.toString());
		// Paragraph paragraphOne = new Paragraph();
		Paragraph paragraphOne1 = new Paragraph("Step 1 :\n", blackFont);
		Paragraph Step1Content = new Paragraph(Step1);
		paragraphOne1.setIndentationLeft(40);
		Step1Content.setIndentationLeft(50);
		document.add(paragraphOne1);
		document.add(Step1Content);
		Paragraph paragraphOne2 = new Paragraph("Step 2 : ", blackFont);
		Paragraph Step2Content = new Paragraph(Step2);
		paragraphOne2.setIndentationLeft(40);
		Step2Content.setIndentationLeft(50);
		document.add(paragraphOne2);
		document.add(Step2Content);

	}

	public static String createPDF(java.util.List<String> imageNameList,
			java.util.List<String> interfaceNameList, java.util.List<String> senderNameList,
			java.util.List<String> receiverNameList, java.util.List<String> iFlowNameList,
			java.util.List<String> queueNameList, java.util.List<String> queueManagerNameList,
			java.util.List<String> serverNameList, java.util.List<String> environmentNameList)
			throws DocumentException, MalformedURLException, IOException {
		Rectangle rect = new Rectangle(10, 10, 550, 800);

		JavaPdfHelloWorld pdf = new JavaPdfHelloWorld();
		Document doc = pdf.document(rect);
		PdfWriter writer = pdf.pdfWriter(doc, "./src/main/webapp/Upgrade_Mitigation_plan.pdf");

		writer.setBoxSize("art", rect);
		doc.setMargins(36, 72, 36, 36);
		writer.setPageEvent(pdf);
		doc.open();

		pdf.title(doc, "ECC Upgrade Mitigation Plan", " ", "bot.jpg");
		doc.newPage();
		pdf.index(doc);
		doc.newPage();
		/* for (int i = 0; i < interfaceName.size(); i++) { */

		/* } */

		// doc.newPage();
		// pdf.conclusion(doc, "OUTAGEE PLAN");
		pdf.outagee(doc, "May 25 2 am");
		doc.newPage();

		pdf.context(doc, "4.Areas Effected", imageNameList, interfaceNameList, senderNameList, receiverNameList,
				iFlowNameList, queueNameList, queueManagerNameList, serverNameList, environmentNameList);
		// pdf.table(doc);
		doc.newPage();
		// pdf.conclusion(doc, "5.CONCLUSION", outageeStatus);
		// Add ordered list

		doc.close();
		writer.close();
		return "Sample";
	}
}