package com.outlook.image.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class OutlookImageApi extends WebMvcConfigurerAdapter {
	public static void main(String[] args) {
		SpringApplication.run(OutlookImageApi.class, args);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/main/**").addResourceLocations("file:src/main/webapp/").setCachePeriod(0);
	}

}