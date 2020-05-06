package com;
import com.Hospital;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/HospitalsAPI")
public class HospitalsAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	Hospital hosObj = new Hospital();
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
    public HospitalsAPI() {
        super();
        
    }

    
    //GET
    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	//INSERT
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		/* doGet(request, response); */
		
		String output = hosObj.insertHospital(request.getParameter("hosCode"),
				request.getParameter("hosName"),
				request.getParameter("password"),
				request.getParameter("address"),
				request.getParameter("mobile"),
				request.getParameter("email"),
				request.getParameter("webAddress"));
		
				response.getWriter().write(output);
		
	}


	//UPDATE
	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		
		String output = hosObj.updateHospital(paras.get("hidHospitalIDSave").toString(),
		paras.get("hosCode").toString().replace("+", " "),
		paras.get("hosName").toString().replace("+", " "),
		paras.get("password").toString(),
		paras.get("address").toString().replace("+", " ").replace("%2C", ",").replace("%3A", ":"),
		paras.get("mobile").toString(),
		paras.get("email").toString().replace("+", " ").replace("%2C", ",").replace("%3A", ":").replace("%40", "@").replace("%2F", "/"),
		paras.get("webAddress").toString().replace("+", " ").replace("%2C", ",").replace("%3A", ":").replace("%40", "@").replace("%2F", "/"));
		
		response.getWriter().write(output);
		
	}


	//DELETE
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map paras = getParasMap(request);
		
		String output = hosObj.deleteHospital(paras.get("hosID").toString());
		
		response.getWriter().write(output);
		
	}
	
	
	//MAP
	private static Map getParasMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
			scanner.close();
			String[] params = queryString.split("&");
			for (String param : params) {
				String[] p = param.split("=");
				map.put(p[0], p[1]);
			}
		} catch (Exception e) {

		}
		return map;
	}
	
	
}
