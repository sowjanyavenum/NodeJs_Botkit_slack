package com.outlook.image.controller;

public class CalendarUtility {

	public int getMonthValue(String month) {
		int mon = 0;

		if (month.toUpperCase().equals("JAN") || month.toUpperCase().equals("JANUARY") || month.equals("1"))
			mon = 0;
		if (month.toUpperCase().equals("FEB") || month.toUpperCase().equals("FEBRUARY") || month.equals("2"))
			mon = 1;
		if (month.toUpperCase().equals("MAR") || month.toUpperCase().equals("MARCH") || month.equals("3"))
			mon = 2;
		if (month.toUpperCase().equals("APR") || month.toUpperCase().equals("APRIL") || month.equals("4"))
			mon = 3;
		if (month.toUpperCase().equals("MAY") || month.toUpperCase().equals("MAY") || month.equals("5"))
			mon = 4;
		if (month.toUpperCase().equals("JUN") || month.toUpperCase().equals("JUNE") || month.equals("6"))
			mon = 5;
		if (month.toUpperCase().equals("JUL") || month.toUpperCase().equals("JULY") || month.equals("7"))
			mon = 6;
		if (month.toUpperCase().equals("AUG") || month.toUpperCase().equals("AUGUST") || month.equals("8"))
			mon = 7;
		if (month.toUpperCase().equals("SEP") || month.toUpperCase().equals("SEPTEMBER") || month.equals("9"))
			mon = 8;
		if (month.toUpperCase().equals("OCT") || month.toUpperCase().equals("OCTOBER") || month.equals("10"))
			mon = 9;
		if (month.toUpperCase().equals("NOV") || month.toUpperCase().equals("NOVEMBER") || month.equals("11"))
			mon = 10;
		if (month.toUpperCase().equals("DEC") || month.toUpperCase().equals("DECEMBER") || month.equals("12"))
			mon = 11;

		return mon;

	}

}
