using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

public class MoviesController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}