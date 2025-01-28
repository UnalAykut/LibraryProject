package com.project.login.security;

import org.springframework.security.web.firewall.FirewalledRequest;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.RequestRejectedException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomHttpFirewall implements HttpFirewall {

	@Override
	public FirewalledRequest getFirewalledRequest(HttpServletRequest request) throws RequestRejectedException {
		// @ ve . işaretlerine izin vermek için burada kontroller eklenebilir
        String uri = request.getRequestURI();
        if (uri.contains("@") || uri.contains(".")) {
            return new FirewalledRequest(request) {
                @Override
                public void reset() {
                    // No custom reset logic
                }
            };
        }
        throw new RequestRejectedException("Invalid request URI: " + uri);
    }

	@Override
	public HttpServletResponse getFirewalledResponse(HttpServletResponse response) {
		return response;
	}

}
