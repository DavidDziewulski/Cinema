using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

public class ReservationController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}