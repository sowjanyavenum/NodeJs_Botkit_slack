package com.outlook.image.controller;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

public class WriteLogEntriesToFile {

	public static String createFile() throws Exception {
		/*
		 * String res = "http://www.google.com"; try { PrintWriter writer = new
		 * PrintWriter("./src/main/webapp/logFile.txt", "UTF-8");
		 * writer.println("The first line"); writer.println("The second line");
		 * writer.close(); } catch (IOException e) { e.printStackTrace(); }
		 * return res; }
		 */

		BufferedWriter bw = null;
		FileWriter fw = null;

		try {

			String content = "This is the content to write into file\n";

			fw = new FileWriter("./src/main/webapp/logFile.txt");
			bw = new BufferedWriter(fw);
			bw.write(content);

			System.out.println("Done "+new Date());

		} catch (IOException e) {

			e.printStackTrace();

		} finally {

			try {

				if (bw != null)
					bw.close();

				if (fw != null)
					fw.close();

			} catch (IOException ex) {

				ex.printStackTrace();

			}
		}
		return "http://www.google.com";
	}

}
