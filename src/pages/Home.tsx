import { useEffect, useRef, useState } from "react";
import Filter from "../components/Filter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { fetchCars } from "../utils/fetchCars";
import { CarType } from "../types";
import Warning from "../components/Warning";
import Card from "../components/Card";
import ShowMore from "../components/ShowMore";
import { useSearchParams } from "react-router-dom";
import { fuels, years } from "../utils/constants";

const Home = () => {
    // Bu state'i tanımlarken generic yardımı ile sadece CarType[] veya null değere sahip olabileceğini söyledik.
    const [cars, setCars] = useState<CarType[] | null>(null);

    // Bu state sadece boolean değerler alabilir.
    const [isError, setIsError] = useState<boolean>(false);

    // katalog divinin referansı
    const catalogRef = useRef<HTMLDivElement>(null);

    // url'deki paramlare eriş
    const [params] = useSearchParams();

    useEffect(() => {
        // url'deki bütün arama parametrelerinden bir nesne oluştur
        const paramsObj = Object.fromEntries(params.entries());

        // verileri çeken fonksiyona parametreleri gönder
        fetchCars(paramsObj)
            .then((data) => setCars(data))
            .catch(() => setIsError(true));
    }, [params]);

    return (
        <div className="mb-40">
            <Hero catalogRef={catalogRef} />

            <div ref={catalogRef} className="mt-12 padding-x padding-y max-width">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>

                    <p>Beğenebileceğin arabaları keşfet</p>

                    <div className="home__filters">
                        <SearchBar />

                        <div className="home__filter-container">
                            <Filter options={fuels} name="fuel_type" />
                            <Filter options={years} name="year" />
                        </div>
                    </div>
                </div>

                {/*
             * Araba Listesi
             1) Veri null ise > API'den cevap gelmemiştir.
             2) isError true ise > API'den hata gelmiştir.
             3) Veri boş dizi ise > Aranılan kriterlere uygun veri yoktur.
             4) Veri dolu dizi ise > API'den arabalar gelmiştir.
             */}
                {!cars ? (
                    <Warning>Yükleniyor...</Warning>
                ) : isError ? (
                    <Warning>Üzgünüz Verileri alırken bir hata oluştu</Warning>
                ) : cars.length < 1 ? (
                    <Warning>Aranalın krilerle uygun araç bulunamadı</Warning>
                ) : (
                    cars.length > 1 && (
                        <section>
                            <div className="home__cars-wrapper">
                                {cars?.map((car, i) => (
                                    <Card car={car} key={i} />
                                ))}
                            </div>

                            <ShowMore />
                        </section>
                    )
                )}
            </div>
        </div>
    )
};

export default Home;
