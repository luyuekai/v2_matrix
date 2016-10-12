/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.matrix.client;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.AccessDeniedException;
import java.sql.Timestamp;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.utils.FileUtil;
import v2.service.generic.library.utils.JsonUtil;

/**
 *
 * @author root
 */
@WebServlet(name = "MatrixFileUploadDemoServlet", urlPatterns = {"/MatrixFileUploadDemoServlet"})
@MultipartConfig
public class MatrixFileUploadDemoServlet extends HttpServlet {

    public static final String KEY_uploadDir = "/opt/matrix/demo/upload";

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String result = null;
        response.addHeader("Cache-Control", "no-cache");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("applicaiton/json");
        final PrintWriter writer = response.getWriter();
        String functionCode = request.getParameter("functionCode");
        System.out.println("functionCode is:"+functionCode);
        result = processUploadDemo(request, response);
        try {
            if (result != null) {
                writer.write(result);
            }
        } catch (Exception fne) {
            fne.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @SuppressWarnings("empty-statement")
    private String processUploadDemo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        QueryResultPOJO result = new QueryResultPOJO();
        String username = "matrix_demo";
        // the directory to upload to
//        String uploadDir = request.getServletContext().getRealPath(KEY_uploadDir);
        String uploadDir = KEY_uploadDir;

        // write the file to the file specified
        FileUtil.createDir(uploadDir);

        // clean the files to make sure that no multiple logo.* files
        FileUtil.delAllFile(uploadDir);

        // Create path components to save the file
        final Part filePart = request.getPart("file");
        String fileName = getFileName(filePart);
        fileName = fileName.replaceAll("\\(", "lll");
        fileName = fileName.replaceAll("\\)", "rrr");

        final String destination = uploadDir + "/" + fileName;

        try {
            boolean flag = FileUtil.writeFile(filePart.getInputStream(), destination);
            if (flag) {
//                flag = FileUtil.copyFile(destination, backupDest);
                if (!flag) {
                    return JsonUtil.toExceptionJson("COPY_FILE_FAILED");
                }
            } else {
                return JsonUtil.toExceptionJson("WRITE_FILE_FAILED");
            }
            // do your upload business

            result.setHasError(Boolean.FALSE);
            result.setStatusCode(GenericStatus.Service_Successed);
            JsonUtil.toJson(result);
        } catch (FileNotFoundException fne) {
            return JsonUtil.toExceptionJson("ERROR_CODE_FILE_NOT_FOUND");
        } catch (AccessDeniedException ade) {
            return JsonUtil.toExceptionJson("ACCESS DENIED");
        }
        return JsonUtil.toJson(result);
    }

    private String getFileName(final Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim()
                        .replace("\"", "");
            }
        }
        return null;
    }

    private String changeFileName(String input, String prefix) {
        String imageName = input;
        int index = imageName.lastIndexOf(".");
        if (index > 0) {
            String suffix = imageName.substring(index);
            imageName = prefix + suffix;
        }
        return imageName;
    }
}
