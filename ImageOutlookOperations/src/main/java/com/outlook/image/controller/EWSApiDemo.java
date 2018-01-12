package com.outlook.image.controller;



import microsoft.exchange.webservices.data.autodiscover.IAutodiscoverRedirectionUrl;
import microsoft.exchange.webservices.data.core.ExchangeService;

import microsoft.exchange.webservices.data.core.enumeration.misc.ExchangeVersion;
import microsoft.exchange.webservices.data.core.service.item.EmailMessage;
import microsoft.exchange.webservices.data.credential.ExchangeCredentials;
import microsoft.exchange.webservices.data.credential.WebCredentials;
import microsoft.exchange.webservices.data.property.complex.MessageBody;

public class EWSApiDemo {

	static class RedirectionUrlCallback implements IAutodiscoverRedirectionUrl {
		public boolean autodiscoverRedirectionUrlValidationCallback(String redirectionUrl) {
			return redirectionUrl.toLowerCase().startsWith("https://");
		}
	}

	public ExchangeService outlookConnect() {
		ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010_SP2);
		ExchangeCredentials credentials = new WebCredentials(JavaMailPropertiesForOutlook.EmailUser,
				JavaMailPropertiesForOutlook.EmailPassword);
		service.setCredentials(credentials);
		try {
			// service.autodiscoverUrl(JavaMailPropertiesForOutlook.EmailUser);
			service.autodiscoverUrl(JavaMailPropertiesForOutlook.EmailUser, new RedirectionUrlCallback());

		} catch (Exception e) {
			e.printStackTrace();
		}
		return service;

	}

	

	public void sendMsgFromEWSWithDesignPDF() {
		try {
			// for (int i = 0; i < contactList.size(); i++) {
			EWSApiDemo ews = new EWSApiDemo();
			ExchangeService service = ews.outlookConnect();
			EmailMessage msg = new EmailMessage(service);

			String html = "<html><head></head>" + "<body>"
					+ "Please find the list of interfaces connecting to the respective systems in the attachment.";

			msg.setSubject("Interface List");
			msg.setBody(MessageBody.getMessageBodyFromText(html));

			msg.getAttachments().addFileAttachment("./src/main/webapp/Upgrade_Mitigation_plan.pdf");
			msg.getToRecipients().add("svenum@miraclesoft.com");
			msg.getToRecipients().add("sadduri@miraclesoft.com");
			//msg.getToRecipients().add("bhattarajaykumar@gmail.com");
			msg.send();
			System.out.println("Mail Sent..");
			// }

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}