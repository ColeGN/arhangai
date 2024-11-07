'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from 'next/image'

const places = [
  {
    id: "chuluut-river",
    name: "Чулуутын гол",
    description: "Хангайн нурууны Гурван Ангархай уулын баруун хэсгийн араас эх авч Даваатын гол нэртэйгээр урсан хэд хэдэн гол горхиудыг нийлүүлэн авч Чулуут гол болон 415 км урсаж Идэр голын баруун гарт очиж нийлнэ. Усаа цуглуулах талбай нь 10750 ам.дөр.км, усны уналт нь 2000 м, гулдралын өргөн нь 80 м, гүн нь 3 м, урсгалын хурд нь 2 м/с ,усны жилийн урсан өнгөрөлт нь 25 шоо м хүрнэ. Хөндий, гулдрал нь хад чулуу ихтэй учраас Чулуут гол гэдэг нэртэй болжээ.",
    author: "Б. Дашням",
    img: 'https://livetv.mn/storage/posts/July2023/tppUj8ywx3bSIHdWDJUH-medium.jpg'
  },
  {
    id: "khorgo-volcano",
    name: "Хоргын тогоо",
    description: "Хорго хэмээх газар Архангай аймгийн Тариат сумын төвд оршдог. Хэн ч саатан хоргодом энэхүү үзэсгэлэнт нутгийг 1965 оноос дархан цаазат газрын, 1994 оноос байгалийн цогцолборт газрын зэрэглэлээр улсын тусгай хамгаалалтад авчээ. Одоогоос 9 мянга орчим жилийн өмнө дэлбэрч байгаад унтарсан галт уул юм гэдгийг манай газар зүйн эрдэмтэд тогтоожээ. Өөрөөр хэлбэл энэ нь манай орны унтарсан галт уулуудын дотроос хамгийн сүүлд унтарсан галт уул юм.",
    author: "Б. Дашням",
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7t9J0EtuCrmi5FwNIB3_l6dwUFW-EPlt1A&s'
  },
  {
    id: "terkhiin-tsagaan-lake",
    name: "Тэрхийн цагаан нуур",
    description: "Хангайн нуруунаас эх авсан Хойд, Урд Тэрхийн голын урсгал Хорго галт уулын халуун хайлмал бодист боогдон үүссэн цэнгэг уст нуур юм. Урт нь 16 км, өргөн нь 4-10 км, 61 ам дөр.км талбайтай, Гүн нь 20 гаруй метр, д.т.д 2060 м өндөрт оршино. Цурхай зэрэг Сэлэнгийн савын загастай. Мөн ховор шувууд амьдардаг. Нуурын Толгой нь Хоргын дархан газарт багтдаг. Дундуур нь гол урсдаг бөгөөд Суман гол гэсэн нэртэй",
    author: "Б. Дашням",
    img: 'https://cdn5.shoppy.mn/img/73333/736x368xwebp/Untitled-1-Recovered.png?h=bde033cfe4e42ebc7fecca5a0ea2364f154d8f0d'
  },
  {
    id: "suvraga-khairkhan",
    name: "Суварга хайрхан уул",
    description: "Суварга хайрхан уул нь Архангай аймгийн Цэнхэр сумын нутагт орших бөгөөд хангайн уулархаг мужийн савд багтах байгалийн өвөрмөц тогтоцтой үзэсгэлэнт сүрлэг уул юм. Энэ уулыг галт уулын гаралтай гэж үздэг. Энэ хайрхан нь Завхан аймагт байдаг Отгонтэнгэр хайрхантай өөд өөдөөсөө харсан байдаг. Хайрханы суга бэлээр адуу мал бэлчиж, өвс ногоо сайхан ургадгийн дээр суга бүхэн нь алт мөнгө зэрэг эрдэс баялгаар арвин байдаг. Тийм учраас бусдын гарт эвдүүлэхгүйн тулд Төрийн тахилгат хайрхан болгосон.",
    author: "Б. Дашням",
    img: 'https://news.zindaa.mn/images/news/origin/13/suvarga%20hairhan.jpg'
  },
  {
    id: "bulgan-mountain",
    name: "Булган уул",
    description: "Булган уул нь Архангай аймгийн Цэцэрлэг суманд оршдог бөгөөд байгалийн үзэсгэлэнт байдал, түүхийн дурсгалт зүйлсийг нь хамгаалах зорилгоор 1965 онд улсын тусгай хамгаалалтанд авсан. 1995 онд УИХ-ын 26 дугаар тогтоолоор байгалийн дурсгалт газрын ангилалд шилжүүлсэн. Булган уул нь урсгалт газрын дундуур зүүн хойш чиглэн тогтох бөгөөд хоёр Тамирын голын усны хагалбар болдог. Булган уул нь ой мод, хадлан бэлчээрийн ургамлаар нэн баялаг бөгөөд тус орны ой хөвч, ойт хээрийн бүсэд тохиолддог ургамлын ихэнх зүйл ургадаг.",
    author: "Б. Дашням",
    img: 'https://content.ikon.mn/news/2024/6/5/n30fr5_418446930_756802943152037_5222567190880283263_n_x974.jpg'
  },
  {
    id: "bilge-khaan-complex",
    name: "Билгэ хааны цогцолбор",
    description: "Билгэ хааны цогцолбор Архангай аймгийн Хашаат сумын Цайдам бригадын нутагт Өгий нуураас баруун урагш 36 км, Хархориноос хойш 47 км зайд Хөгшин Орхон голын зүүн эрэг, Цайдам нуурын баруун өмнө оршдог. Эл дурсгал нь Хөшөө цайдмын дурсгал, Орхоны хөндийн дурсгал, Культегины бичээс, Билгэ хааны дурсгал гэх мэтээр нэрлэгдэн 100 гаруй жилийн турш судлагдсаар иржээ. ЮНЕСКО 'Дэлхийн гайхамшигт үнэт зүйл болох нь' гэдэг зэрэглэлээр дэлхийн соёлын өвд 1996 онд бүртгэн авсан байна.",
    author: "Б. Дашням",
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDOsRlRwNWtrBwLN2CotCkHu1Kpje1SRdkQ&s'
  }
]

const itinerary = [
  {
    day: "1 дэх өдөр",
    description: "Аялагч та эхний өдөр Улаанбаатараас баруун чиглэлийн хатуу хучилттай замаар 377 км яваад Хархоринд ирнэ. Энэ хооронд Элсэн тасархай хэмээх байгалийн сонин тогтоц бүхий газарт ирж амран, хоол идэж, тэмээ унах боломжтой. Энд нэг тэмээг унаад ирэхэд 10000 төгрөг гэдэг. Хархориноос хойд зүгт 45 км мөн хатуу хучилттай замаар яваад Хөшөө цайдамын музейг үзнэ. Монгол Улсын Засгийн газрын 2010 оны 32-р тоот тогтоолоор Монгол Улсын нутаг дэвсгэр дээр оршиж байсан Түрэгийн хаант улсын түүх, соёлтой холбогдол бүхий хосгүй үнэт эд өлгийн зүйл, олдворыг хадгалж хамгаалах, судлах, сурталчлах үүрэг бүхий Хөшөө цайдам музейг байгуулсан байна. Хөшөө цайдамд байрлах 'Цайдам' баазад амарна."
  },
  {
    day: "2 дахь өдөр",
    description: "Аяллын хоёр дахь өдөр 177 км зайд орших Цэнхэрийн халуун рашаанд ирнэ. Уг рашаан нь алжаал тайлж амрахад тохиромжтой юм. Рашаан нь их гүнийх бөгөөд дөрөвдөгч галавын хурдас их боловч хөрсний устай холилдохгүй гардаг. Рашааны температур нь 65-90 градусын халуун бөгөөд Монголдоо халуунаараа 2 дугаарт ордог. Цэнхэрийн халуун рашааны чанар нь ердийн шүлтлэг бөгөөд газрын гүнээс 86 градусын халуунаар 1 секундэд 10 л орчим ундран гардаг. Энэ рашаанд хүхэрт устөрөгч, цахиурын нэгдэл агуулагддаг учраас хуян, мэдрэлийн судас үрэвсэх, булчингийн өвчин, үе мөчний өвчин, зөөлөн эдийн гэмтэл, цус багадалт, эмчилгээний дараах эрүүл мэнд сэргээхэд, ядаргаа, архаг арьсны өвчин, ил шарх, чихрийн шижин өвчтэй хүн бага тунгаар уувал сайн нөлөөтэй."
  },
  {
    day: "3 дахь өдөр",
    description: "Цэнхэрийн халуун рашаанд нэг хоног саатан амарсны маргааш өглөө аймгийн төв Цэцэрлэг хотод 28 км шороон замаар явж ирнэ. Цэцэрлэг хотод Булган уул болон цэцэрлэгт хүрээлэнгүүд, аймгийн музейгээр зочилж, аймгийн төвтэй танилцан цагаан идээ, айраг зэрэг нутгийн брэнд бүтээгдэхүүнээс худалдан авч болох юм. Мөн хоолны газар, кофе шопоор үйлчлүүлэн, АРА комплексоор орж, цирк, амьтны хүрээлэн, фото зургийн үзэсгэлэн зэргийг үзэж, хүүхдүүдээ тоглуулж тухална. Эл өдөр Тайхар чулууг үзэж, үдийн хоолоо идээд Чулуутын хавцлыг зорьж, тэндээ амарна."
  },
  {
    day: "4 дэх өдөр",
    description: "Чулуут голын хавцлаас Хорго, Тэрхийн цагаан нуурыг зорино. Энэ хугацаанд Чулуутын хавцлаас доош 15 км-ийн зайтай орших Чойдогийн боргиог үзэн сонирхон, Суман, Чулуут голын уулзвар болох Улаан давааг үзэх юм. Эндээс Тэрхийн цагаан нуур руу явна. Архангай аймгийн Тариат сумын нутагт Чулуут-Суман голын бэлчирээс холгүйхэн орших нэг метр өндөртэй бяцхан хүрхрээг Чойдогийн боргио гэнэ. Энд Чулуут гол болон Сэлэнгийн сав газрын загас цугларч боргионы өөд үсрэн дүүлэх нь нэн сонирхолтой."
  },
  {
    day: "5 дахь өдөр",
    description: "Хорго, Тэрхийн цагаан нуурт амраад маргааш өглөө нь шууд Өгийнуурыг зорино. Өгийнуур нь Цэцэрлэг хотоос 140 км зайд алслагдана. Өгий нуур нь Архангай аймгийн Өгийнуур сумын төвөөс зүүн хойш орших үзэсгэлэнт нуур бөгөөд Орхон голын сав газарт харьяалагдана. Өгий нуурын ус намгархаг газар 2570 га талбайтай, эргийн шугамын урт нь 24,7 км, хамгийн гүн хэсэгтээ 15,3м, 171 сая м3 эзэлхүүнтэй, Хөгшин Орхон гол баруун урдаас цутгадаг. Өгий нуурын ойролцоох баазуудад эсвэл нуурын эрэгт майхнаа бариад амарч болох таатай орчин таныг хүлээж байна."
  },
  {
    day: "6 дахь өдөр",
    description: "Өгий нуурт амраад 350 км зам туулж Улаанбаатарт очно."
  }
]


export default function Home() {
  const [activeTab, setActiveTab] = useState("places")
  const [activePlace, setActivePlace] = useState(places[0].id)
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0)

  const handlePrevPlace = () => {
    setCurrentPlaceIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : places.length - 1))
    setActivePlace(places[currentPlaceIndex > 0 ? currentPlaceIndex - 1 : places.length - 1].id)
  }

  const handleNextPlace = () => {
    setCurrentPlaceIndex((prevIndex) => (prevIndex < places.length - 1 ? prevIndex + 1 : 0))
    setActivePlace(places[currentPlaceIndex < places.length - 1 ? currentPlaceIndex + 1 : 0].id)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">Архангай аймгийн үзэсгэлэнт газрууд</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="places">Үзэсгэлэнт газрууд</TabsTrigger>
          <TabsTrigger value="itinerary">Аялалын хөтөлбөр</TabsTrigger>
        </TabsList>
        <TabsContent value="places">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-6">
            <TabsList className="inline-flex  w-max p-1 h-auto">
              {places.map((place) => (
                <TabsTrigger
                  key={place.id}
                  value={place.id}
                  onClick={() => {
                    setActivePlace(place.id)
                    setCurrentPlaceIndex(places.findIndex(p => p.id === place.id))
                  }}
                  className="px-3 flex justify-between py-1.5 text-sm"
                >
                  {place.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
          {places.map((place, index) => (
            <div key={place.id} className={activePlace === place.id ? 'block' : 'hidden'}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl">{place.name}</CardTitle>
                  {/* <CardDescription className="text-sm md:text-base">Зохиогч: {place.author}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted mb-4 rounded-md overflow-hidden relative">
                    <Image
                      src={place.img}
                      alt={`Зураг: ${place.name}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground">{place.description}</p>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-4">
                <Button onClick={handlePrevPlace} variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Өмнөх</Button>
                <Button onClick={handleNextPlace} variant="outline">Дараах <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="itinerary">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl lg:text-3xl">Аялалын хөтөлбөр</CardTitle>
              <CardDescription className="text-sm md:text-base">Өдөр тутмын аялалын төлөвлөгөө</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {itinerary.map((day, index) => (
                  <AccordionItem key={index} value={`day-${index + 1}`}>
                    <AccordionTrigger>{day.day}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm md:text-base lg:text-lg text-muted-foreground">{day.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">Архангай аймаг руу очих зам</CardTitle>
          <CardDescription className="text-sm md:text-base">Улаанбаатараас Архангай аймгийн төв Цэцэрлэг хот хүртэлх зам</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1363424.6332779314!2d101.46981677773437!3d47.44899999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x5d9692c5488a7c0b%3A0x43b809f25fdf80!2sUlaanbaatar%2C%20Mongolia!3m2!1d47.8863988!2d106.9057439!4m5!1s0x5d1422cec59bda7f%3A0x4018c5577102b20e!2sTsetserleg%2C%20Mongolia!3m2!1d47.4645556!2d101.45333329999999!5e0!3m2!1sen!2sus!4v1700227121309!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{border:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Улаанбаатараас Архангай аймгийн төв Цэцэрлэг хот хүртэлх зам"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}