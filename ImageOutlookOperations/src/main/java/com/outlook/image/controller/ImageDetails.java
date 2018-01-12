package com.outlook.image.controller;

import java.util.ArrayList;
import java.util.List;

public class ImageDetails {
	private List<String> source = new ArrayList<String>();
	private List<String> target = new ArrayList<String>();
	private List<String> interfaceName = new ArrayList<String>();
	private List<String> eai = new ArrayList<String>();
	private List<String> iFlow = new ArrayList<String>();
	private List<String> senderCC = new ArrayList<String>();
	private List<String> receiverCC = new ArrayList<String>();

	public ImageDetails() {
		// no-op;
	}

	private List<String> qName = new ArrayList<String>();
	private List<String> qManagerName = new ArrayList<String>();
	private List<String> server = new ArrayList<String>();
	private List<String> environment = new ArrayList<String>();

	public ImageDetails(List<String> source, List<String> target, List<String> interfaceName, List<String> eai,
			List<String> iFlow, List<String> senderCC, List<String> receiverCC, List<String> qName,
			List<String> qManagerName, List<String> server, List<String> environment) {
		this.source = source;
		this.target = target;
		this.interfaceName = interfaceName;
		this.eai = eai;
		this.iFlow = iFlow;
		this.senderCC = senderCC;
		this.receiverCC = receiverCC;
		this.qName = qName;
		this.qManagerName = qManagerName;
		this.server = server;
		this.environment = environment;
	}

	public List<String> getSource() {
		return source;
	}

	public void setSource(List<String> source) {
		this.source = source;
	}

	public List<String> getTarget() {
		return target;
	}

	public void setTarget(List<String> target) {
		this.target = target;
	}

	public List<String> getInterfaceName() {
		return interfaceName;
	}

	public void setInterfaceName(List<String> interfaceName) {
		this.interfaceName = interfaceName;
	}

	public List<String> getEai() {
		return eai;
	}

	public void setEai(List<String> eai) {
		this.eai = eai;
	}

	public List<String> getiFlow() {
		return iFlow;
	}

	public void setiFlow(List<String> iFlow) {
		this.iFlow = iFlow;
	}

	public List<String> getSenderCC() {
		return senderCC;
	}

	public void setSenderCC(List<String> senderCC) {
		this.senderCC = senderCC;
	}

	public List<String> getReceiverCC() {
		return receiverCC;
	}

	public void setReceiverCC(List<String> receiverCC) {
		this.receiverCC = receiverCC;
	}

	public List<String> getqName() {
		return qName;
	}

	public void setqName(List<String> qName) {
		this.qName = qName;
	}

	public List<String> getqManagerName() {
		return qManagerName;
	}

	public void setqManagerName(List<String> qManagerName) {
		this.qManagerName = qManagerName;
	}

	public List<String> getServer() {
		return server;
	}

	public void setServer(List<String> server) {
		this.server = server;
	}

	public List<String> getEnvironment() {
		return environment;
	}

	public void setEnvironment(List<String> environment) {
		this.environment = environment;
	}

	@Override
	public String toString() {
		return "ImageDetails [source=" + source + ", target=" + target + ", interfaceName=" + interfaceName + ", eai="
				+ eai + ", iFlow=" + iFlow + ", senderCC=" + senderCC + ", receiverCC=" + receiverCC + ", qName="
				+ qName + ", qManagerName=" + qManagerName + ", server=" + server + ", environment=" + environment
				+ "]";
	}

}
