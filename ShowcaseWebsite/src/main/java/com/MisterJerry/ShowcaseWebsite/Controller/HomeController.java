package com.MisterJerry.ShowcaseWebsite.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }
    
    @GetMapping("/scarpe")
    public String shoes() {
        return "forward:/pages/shoes_page.html";
    }
    
    @GetMapping("/chi-siamo")
    public String about() {
        return "forward:/pages/about_us.html";
    }
    
    @GetMapping("/contatti")
    public String contact() {
        return "forward:/index.html#contact";
    }
}
