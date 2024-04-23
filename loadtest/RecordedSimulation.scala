
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class RecordedSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://74.249.118.115:8000")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map("Accept" -> "image/avif,image/webp,*/*")
  
  private val headers_3 = Map(
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val headers_4 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val headers_6 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-None-Match" -> """"64231e14f0c22608549fa55470b59055e61f3f18""""
  )
  
  private val headers_9 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-None-Match" -> """"3651f06753626002056f01b0dd4560054bc107f2""""
  )
  
  private val headers_10 = Map(
  		"Access-Control-Request-Headers" -> "authorization",
  		"Access-Control-Request-Method" -> "GET",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val headers_11 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"10e-uVAt30Ii++t5kGiG3x+Y9rE79cs"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_12 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"cf-4kdrf8LRnsjUbO0m9VsJnl5Zp80"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_14 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"bd-5qcnwBzyVZBrv2l1LrxQ71G8ACI"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_16 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"e5-o8JJgGBKUCWK4arFTlUetUzVdRo"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_18 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"110-JKwSeERpkNlInd5+FAxRXFT5fVw"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_20 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"d7-RkHdGmToVIg2w1s+AUpynnLTyJw"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_22 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"a6-/sfXcMb9vvdo/vDR+Gw2HvLwrqE"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_24 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"25b-KfF1QQpdrGLxHVcG3ApLNdDwWhc"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_26 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"106-iZDpUiSyjRfQy59hLh1QUaj3dsU"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_28 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"10e-tdVlIB4QWWhcCMqjRqd3mqGe9bo"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val headers_31 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val headers_32 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"a7-+5GXbwsxRX/ZLWtu9Vx/LJqwxR4"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTM0MzIwMzQsImV4cCI6MTcxMzQzNTYzNH0.km-ytTr2VAnjqf0U_j5biWmk5BKX4Y79Zc_bZT8ivbw"
  )
  
  private val uri1 = "74.249.118.115"

  private val scn = scenario("RecordedSimulation")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/static/media/background.18d7496189dd70beb038.png")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/static/media/stats.9cf686bb836c7985f096.png")
            .headers(headers_1)
        ),
      pause(2),
      http("request_3")
        .options("/login")
        .headers(headers_3)
        .resources(
          http("request_4")
            .post("/login")
            .headers(headers_4)
            .body(RawFileBody("recordedsimulation/0004_request.json"))
        ),
      pause(2),
      http("request_5")
        .get("http://" + uri1 + ":3000/home")
        .headers(headers_0)
        .resources(
          http("request_6")
            .get("http://" + uri1 + ":3000/saber-ganar-logo.png")
            .headers(headers_6),
          http("request_7")
            .get("http://" + uri1 + ":3000/static/media/stats.9cf686bb836c7985f096.png")
            .headers(headers_1),
          http("request_8")
            .get("http://" + uri1 + ":3000/game")
            .headers(headers_0),
          http("request_9")
            .get("http://" + uri1 + ":3000/static/media/stats.9cf686bb836c7985f096.png")
            .headers(headers_9),
          http("request_10")
            .options("/generate-question")
            .headers(headers_10),
          http("request_11")
            .get("/generate-question")
            .headers(headers_11)
        ),
      pause(1),
      http("request_12")
        .get("/generate-question")
        .headers(headers_12),
      pause(3),
      http("request_13")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_14")
            .get("/generate-question")
            .headers(headers_14)
        ),
      pause(8),
      http("request_15")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_16")
            .get("/generate-question")
            .headers(headers_16)
        ),
      pause(11),
      http("request_17")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_18")
            .get("/generate-question")
            .headers(headers_18)
        ),
      pause(9),
      http("request_19")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_20")
            .get("/generate-question")
            .headers(headers_20)
        ),
      pause(6),
      http("request_21")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_22")
            .get("/generate-question")
            .headers(headers_22)
        ),
      pause(5),
      http("request_23")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_24")
            .get("/generate-question")
            .headers(headers_24)
        ),
      pause(8),
      http("request_25")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_26")
            .get("/generate-question")
            .headers(headers_26)
        ),
      pause(7),
      http("request_27")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_28")
            .get("/generate-question")
            .headers(headers_28)
        ),
      pause(6),
      http("request_29")
        .options("/generate-question")
        .headers(headers_10)
        .resources(
          http("request_30")
            .options("/addStatistic")
            .headers(headers_3),
          http("request_31")
            .post("/addStatistic")
            .headers(headers_31)
            .body(RawFileBody("recordedsimulation/0031_request.json")),
          http("request_32")
            .get("/generate-question")
            .headers(headers_32)
        )
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds)
randomized)).protocols(httpProtocol)
}
