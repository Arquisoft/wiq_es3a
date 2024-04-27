
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
  		"If-None-Match" -> """"50fc059271f015ad7d8083752617287cc270cc69"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map("If-None-Match" -> """"6021ce2dcfc67fa40218638702d0b763a69a8f79"""")
  
  private val headers_2 = Map(
  		"Accept" -> "text/css,*/*;q=0.1",
  		"If-None-Match" -> """"8c0d035dbe3d992bceab1d2cd01a6589bdc72208""""
  )
  
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
  
  private val headers_8 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-None-Match" -> """"64231e14f0c22608549fa55470b59055e61f3f18""""
  )
  
  private val headers_12 = Map(
  		"Access-Control-Request-Headers" -> "authorization",
  		"Access-Control-Request-Method" -> "GET",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val headers_13 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"de-I0mZZmLu/07G45WA7K07pyY+OkY"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_14 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"a5-7GQh4usOGc88j91N61XlWLqPI+Y"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_16 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"225-K2R/IxbLdsZla/5HawZA1XjlK7M"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_18 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"c2-kQfznB8kMm3NbMF0RmuevuIvhek"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_20 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"27d-MKxNZla3psDZetbogSDa5rXtOt4"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_22 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"241-uACLME4Vy04vnbJFi2ZhFRVuhL4"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_24 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"c1-YF5Pys1Vmo8koOKcUyNi1g37AjI"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_26 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"24d-OlbyAJIB9cPws+IXk78Jolbctww"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_27 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"bd-MPkMYVyUOGaNtZhOUkttRfha8aQ"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_29 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"ea-iYJYHy/mElfKqzT+JdCDLmnrI7o"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_31 = Map(
  		"Accept" -> "application/json, text/plain, */*",
  		"If-None-Match" -> """W/"2ab-BpQAHJ5J/WPmi49Q5Z7DJl+N3Ls"""",
  		"Origin" -> "http://74.249.118.115:3000",
  		"authorization" -> "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjEyODNjMjJhZjI3ZDIzZWM1NjMxZjYiLCJpYXQiOjE3MTQyMTcyNzksImV4cCI6MTcxNDIyMDg3OX0.ZJZSoFp4IdCqPS9S_sget3CgwlNoWvDZiZl8Vk2eNh0"
  )
  
  private val headers_33 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://74.249.118.115:3000"
  )
  
  private val uri1 = "74.249.118.115"

  private val scn = scenario("RecordedSimulation")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/login")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/static/js/main.a680658d.js")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/static/css/main.6bbcb7ec.css")
            .headers(headers_2)
        ),
      pause(4),
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
            .get("http://" + uri1 + ":3000/static/js/main.a680658d.js")
            .headers(headers_1),
          http("request_7")
            .get("http://" + uri1 + ":3000/static/css/main.6bbcb7ec.css")
            .headers(headers_2),
          http("request_8")
            .get("http://" + uri1 + ":3000/saber-ganar-logo.png")
            .headers(headers_8)
        ),
      pause(1),
      http("request_9")
        .get("http://" + uri1 + ":3000/game")
        .headers(headers_0)
        .resources(
          http("request_10")
            .get("http://" + uri1 + ":3000/static/js/main.a680658d.js")
            .headers(headers_1),
          http("request_11")
            .get("http://" + uri1 + ":3000/static/css/main.6bbcb7ec.css")
            .headers(headers_2),
          http("request_12")
            .options("/generate-question")
            .headers(headers_12),
          http("request_13")
            .get("/generate-question")
            .headers(headers_13),
          http("request_14")
            .get("/generate-question")
            .headers(headers_14)
        ),
      pause(6),
      http("request_15")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_16")
            .get("/generate-question")
            .headers(headers_16)
        ),
      pause(6),
      http("request_17")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_18")
            .get("/generate-question")
            .headers(headers_18)
        ),
      pause(5),
      http("request_19")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_20")
            .get("/generate-question")
            .headers(headers_20)
        ),
      pause(4),
      http("request_21")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_22")
            .get("/generate-question")
            .headers(headers_22)
        ),
      pause(1),
      http("request_23")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_24")
            .get("/generate-question")
            .headers(headers_24)
        ),
      pause(5),
      http("request_25")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_26")
            .get("/generate-question")
            .headers(headers_26)
        ),
      pause(4),
      http("request_27")
        .get("/generate-question")
        .headers(headers_27),
      pause(4),
      http("request_28")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_29")
            .get("/generate-question")
            .headers(headers_29)
        ),
      pause(4),
      http("request_30")
        .options("/generate-question")
        .headers(headers_12)
        .resources(
          http("request_31")
            .get("/generate-question")
            .headers(headers_31),
          http("request_32")
            .options("/addStatistic")
            .headers(headers_3),
          http("request_33")
            .post("/addStatistic")
            .headers(headers_33)
            .body(RawFileBody("recordedsimulation/0033_request.json"))
            .check(status.is(400))
        ),
      pause(4),
      http("request_34")
        .get("http://" + uri1 + ":3000/saber-ganar-logo.png")
        .headers(headers_8)
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds)
randomized)).protocols(httpProtocol)
}
