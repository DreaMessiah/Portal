import "./style.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";


export const ViewPOST = () => {
    const thisPost = [];
    return (
        <div className="view_new_post">
            <div className="view_new_post_tools">
                <div className="view_new_post_tools_plusblock">Все новости</div>
                <div className="view_new_post_tools_publish">Следующая новость</div>
            </div>
            <div className="view_new_post_worklist">
                <div className="view_new_post_worklist_header" >Модульность в JavaScript: CommonJS, AMD, ES Modules</div>

                <div className="view_new_post_worklist_mainimg">
                </div>

                <div className="view_new_post_worklist_content">
                    <div className="view_new_post_worklist_content_smalltext">
                        Начало истории модульности в JavaScript положило хаос: глобальные переменные, конфликты имен и сложности с зависимостями. Со временем сообщество предложило несколько подходов для организации модулей, начиная от CommonJS, которое легло в основу Node.js, до AMD, предпочтительного для асинхронной загрузки кода в браузерах. И приближаясь к настоящему времени появился ES Modules стандартизированный и встроенный в язык механизма модулей, который стал частью ECMAScript в 2015 году.
                    </div>
                    <div className="view_new_post_worklist_content_title">CommonJS</div>
                    <div className="view_new_post_worklist_content_longtext">
                        CommonJS ставил своей целью создание стандарта для модулей, которые могли бы быть использованы в любом окружении, включая серверные приложения. Основная миссия состояла в том, чтобы облегчить разработку модульного кода, который был бы структурирован и легкий в использовании. CommonJS определяет модуль как заключенный блок кода, который взаимодействует с другими модулями через экспорт и импорт значений.

                        В Node.js каждый файл считается модулем и в нем была принята спецификация CommonJS как де-факто стандарт для организации модулей.

                        Система модулей CommonJS в Node.js поддерживает как синхронную загрузку модулей, так и ленивую загрузку. Node.js использует кэширование загруженных модулей, что сокращает время их повторной загрузки и, как следствие, ускоряет выполнение программы.

                        В CommonJS, каждый файл JavaScript считается отдельным модулем. Если нужно функции, объекты или примитивы доступными вне текущего модуля, можно использоватьmodule.exports
                    </div>
                    <div className="view_new_post_worklist_content_imgtext">
                        <div className="view_new_post_worklist_content_imgtext_img">
                        </div>
                        <div className="view_new_post_worklist_content_imgtext_text">
                            AMD - это стандарт, позволяющий определять модули JavaScript и их зависимости в асинхронном стиле. Обычно скрипты загружаются синхронно, что может привести к заметной задержке в интерактивности страницы, если скрипт находится на удаленном сервер. AMD в целом создан, чтобы решить эту проблему.

                            Среди различных реализаций AMD, самый годный - это RequireJS. Она служит стандартом де-факто для разрабов, стремящихся внедрить асинхронную загрузку модулей в проекты.

                            RequireJS предлагает простой API для асинхронной загрузки JavaScript-файлов и управления зависимостями. С его помощью можно определить модули, указать их зависимости и загрузить их только тогда, когда это действительно необходимо.

                            Каждый модуль определяется с помощью функции define(), принимающей список зависимостей и фабричную функцию. Простой модуль без зависимостей:
                        </div>
                    </div>
                    <div className="view_new_post_worklist_content_tripleimgs">
                        <div className="view_new_post_worklist_content_tripleimgs_img imgback1"></div>
                        <div className="view_new_post_worklist_content_tripleimgs_img imgback2"></div>
                        <div className="view_new_post_worklist_content_tripleimgs_img imgback3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}