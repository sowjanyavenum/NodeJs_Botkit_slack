package com.outlook.image.controller;

import java.util.Properties;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;

public class JavaMailPropertiesForOutlook {
	final static String EmailUser = "bhattarajaykumar@hotmail.com";
	final static String EmailPassword = "Hotm@il512";
	
	public Session getProperties(){
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp-mail.outlook.com");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.ssl.trust", "smtp-mail.outlook.com");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.connectiontimeout", "10000");

		/* Session session = Session.getDefaultInstance(props, null); */

		

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(EmailUser, EmailPassword);
			}
		});
		return session;
	}
	
}
