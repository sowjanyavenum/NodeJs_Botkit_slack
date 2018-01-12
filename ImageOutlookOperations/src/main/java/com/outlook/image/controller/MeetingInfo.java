package com.outlook.image.controller;

import java.util.ArrayList;
import java.util.List;

public class MeetingInfo {
	private List<String> email = new ArrayList<String>();
	private MeetingStartTime starttime;
	private MeetingEndTime endtime;
	private String agenda;
	public List<String> getEmail() {
		return email;
	}
	public void setEmail(List<String> email) {
		this.email = email;
	}
	public MeetingStartTime getStarttime() {
		return starttime;
	}
	public void setStarttime(MeetingStartTime starttime) {
		this.starttime = starttime;
	}
	public MeetingEndTime getEndtime() {
		return endtime;
	}
	public void setEndtime(MeetingEndTime endtime) {
		this.endtime = endtime;
	}
	public String getAgenda() {
		return agenda;
	}
	public void setAgenda(String agenda) {
		this.agenda = agenda;
	}
	public MeetingInfo(List<String> email, MeetingStartTime starttime, MeetingEndTime endtime, String agenda) {
		
		this.email = email;
		this.starttime = starttime;
		this.endtime = endtime;
		this.agenda = agenda;
	}
	public MeetingInfo() {

	}
	@Override
	public String toString() {
		return "MeetingInfo [email=" + email + ", starttime=" + starttime + ", endtime=" + endtime + ", agenda="
				+ agenda + "]";
	}

}
