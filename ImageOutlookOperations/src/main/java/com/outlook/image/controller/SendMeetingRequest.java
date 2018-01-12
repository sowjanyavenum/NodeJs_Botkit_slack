package com.outlook.image.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

import javax.activation.DataHandler;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

public class SendMeetingRequest {
	private static final DateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

	public void send(MeetingInfo meeting) throws Exception {
		JavaMailPropertiesForOutlook prop = new JavaMailPropertiesForOutlook();

		// Start Time Format Procedure...
		Calendar calStartDate = Calendar.getInstance();
		calStartDate.set(Calendar.YEAR, meeting.getStarttime().getYear());
		CalendarUtility cu = new CalendarUtility();
		int startMonth = cu.getMonthValue(meeting.getStarttime().getMonth());
		calStartDate.set(Calendar.MONTH, startMonth);
		calStartDate.set(Calendar.DAY_OF_MONTH, meeting.getStarttime().getDay());
		calStartDate.set(Calendar.HOUR_OF_DAY, meeting.getStarttime().getHours());
		calStartDate.set(Calendar.MINUTE, meeting.getStarttime().getMinutes());
		calStartDate.set(Calendar.SECOND, 0);
		calStartDate.set(Calendar.MILLISECOND, 0);

		/* Date meetingstartdate = calStartDate.getTime(); */
		sdf.setTimeZone(TimeZone.getTimeZone("Etc/Greenwich"));
		String startDateInGMT = sdf.format(calStartDate.getTime());
		System.out.println("Date in GMT Timezone : " + startDateInGMT);

		/*
		 * System.out.println(meetingstartdate); String starttime =
		 * sdf.format(meetingstartdate.getTime());
		 */

		StringBuffer startTimeFormat = new StringBuffer();
		startTimeFormat.append(startDateInGMT.substring(0, 8) + "T" + startDateInGMT.substring(8, 14));
		System.out.println(startTimeFormat);

		// End Time Format Procedure...
		Calendar calEndDate = Calendar.getInstance();
		calEndDate.set(Calendar.YEAR, meeting.getEndtime().getYear());
		int endMonth = cu.getMonthValue(meeting.getEndtime().getMonth());
		calEndDate.set(Calendar.MONTH, endMonth);
		calEndDate.set(Calendar.DAY_OF_MONTH, meeting.getEndtime().getDay());
		calEndDate.set(Calendar.HOUR_OF_DAY, meeting.getEndtime().getHours());
		calEndDate.set(Calendar.MINUTE, meeting.getEndtime().getMinutes());
		calEndDate.set(Calendar.SECOND, 0);
		calEndDate.set(Calendar.MILLISECOND, 0);

		/* Date meetingstartdate = calStartDate.getTime(); */
		sdf.setTimeZone(TimeZone.getTimeZone("Etc/Greenwich"));
		String endDateInGMT = sdf.format(calEndDate.getTime());
		System.out.println("Date in GMT Timezone : " + endDateInGMT);

		/*
		 * System.out.println(meetingstartdate); String starttime =
		 * sdf.format(meetingstartdate.getTime());
		 */

		StringBuffer endTimeFormat = new StringBuffer();
		endTimeFormat.append(endDateInGMT.substring(0, 8) + "T" + endDateInGMT.substring(8, 14));
		System.out.println(endTimeFormat);
		for (int i = 0; i < meeting.getEmail().size(); i++) {
			try {
				String from = JavaMailPropertiesForOutlook.EmailUser;
				String to = meeting.getEmail().get(i);
				Session session = prop.getProperties();
				// Define message
				MimeMessage message = new MimeMessage(session);
				message.addHeaderLine("method=REQUEST");
				message.addHeaderLine("charset=UTF-8");
				message.addHeaderLine("component=VEVENT");

				message.setFrom(new InternetAddress(from));
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
				message.setSubject("Upgrade Meeting");

				StringBuffer sb = new StringBuffer();

				StringBuffer buffer = sb
						.append("BEGIN:VCALENDAR\n" + "PRODID:-//Microsoft Corporation//Outlook 9.0 MIMEDIR//EN\n"
								+ "VERSION:2.0\n" + "METHOD:REQUEST\n" + "BEGIN:VEVENT\n"
								+ "ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:"+to+"\n"
								+ "ORGANIZER:MAILTO:"+JavaMailPropertiesForOutlook.EmailUser+"\n" + "DTSTART:" + startTimeFormat
								+ "Z\n" + "DTEND:" + endTimeFormat + "Z\n" + "LOCATION:Conference room\n"
								+ "TRANSP:OPAQUE\n" + "SEQUENCE:0\n"
								+ "UID:040000008200E00074C5B7101A82E00800000000002FF466CE3AC5010000000000000000100\n"
								+ " 000004377FE5C37984842BF9440448399EB02\n" + "DTSTAMP:20170523T143000Z\n"
								+ "CATEGORIES:Meeting\n" + "DESCRIPTION:" + meeting.getAgenda()
								+ "SUMMARY:Test meeting request\n" + "PRIORITY:5\n" + "CLASS:PUBLIC\n"
								+ "BEGIN:VALARM\n" + "TRIGGER:PT1440M\n" + "ACTION:DISPLAY\n" + "DESCRIPTION:Reminder\n"
								+ "END:VALARM\n" + "END:VEVENT\n" + "END:VCALENDAR");
				System.out.println(buffer);
				// Create the message part
				BodyPart messageBodyPart = new MimeBodyPart();

				// Fill the message
				messageBodyPart.setHeader("Content-Class", "urn:content-  classes:calendarmessage");
				messageBodyPart.setHeader("Content-ID", "calendar_message");
				messageBodyPart
						.setDataHandler(new DataHandler(new ByteArrayDataSource(buffer.toString(), "text/calendar")));// very
																														// important

				// Create a Multipart
				Multipart multipart = new MimeMultipart();

				// Add part one
				multipart.addBodyPart(messageBodyPart);

				// Put parts in message
				message.setContent(multipart);

				// send message
				Transport.send(message);
				System.out.println("Meeting Request Sent to " + meeting.getEmail().get(i));
			} catch (MessagingException me) {
				me.printStackTrace();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}
}
