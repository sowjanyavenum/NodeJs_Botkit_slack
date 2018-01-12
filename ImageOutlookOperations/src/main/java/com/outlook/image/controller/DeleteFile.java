package com.outlook.image.controller;
import java.io.File;

public class DeleteFile
{
    public static String delete()
    {
    	String res = null;
    	try{

    		File file = new File("./src/main/webapp/logFile.txt");

    		if(file.delete()){
    			res = file.getName() + " is deleted!";
    			System.out.println(res);
    		}else{
    			System.out.println("Delete operation is failed.");
    		}

    	}catch(Exception e){

    		e.printStackTrace();

    	}
		return res;

    }
}