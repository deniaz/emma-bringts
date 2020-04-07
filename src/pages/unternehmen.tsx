import { Stacked } from '../layout/stacked';
import { Navigation } from '../components/navigation';
import { ContentBox } from '../components/content-box';

export default () => (
    <Stacked title="Tipps für Unternehmen">

        <section className="bg-emma-yellow-400 lg:bg-emma-blue-400">
            <Navigation />
            <div className="container emma-container content-page">
                <div className="content-secation content-secation-hero">
                    <img src="/img/illus/illu-coffee.svg" alt=""/>

                    <div className="text">
                        <h1 className="h1 mb-4">Tipps für Unternehmen</h1>
                        <p className="p-lead">Für einige von euch wird diese neue Situation im Kundenumgang Herausforderungen mit sich bringen, andere hingegen wissen bereits welche Möglichkeiten es gibt, um den Kunden trotz der aussergewöhnlichen Situation ein tolles Kundenerlebnis zu bieten. Egal zu welcher Gruppe du gehörst, hier ein paar Ideen um euren Kunden und Kundinnen weiterhin die bestmögliche Erfahrung zu bieten:</p>
                    </div>
                </div>
            </div>


        </section>

        <section className="bg-emma-blue-400 lg:pt-16 flex">
            <div className="container emma-container content-page">

                <ContentBox
                    title="Beratung trotz Social Distancing?"
                    text={[
                        'Es ist natürlich klar: Am einfachsten ist es, wenn deine Kunden direkt zu dir ins Geschäft kommen. Aber neue Situationen erfordern neue Wege. Daher haben wir hier ein paar Ideen wie du deinen Kunden trotz Social Distancing eine optimale Beratung bieten kannst:',
                        'Mit Whatsapp bist du in Echtzeit für deine Kunden erreichbar und kannst super einfach Fotos und Videos austauschen. Du willst direkt mit dem Kunden sprechen? Auch kein Problem: Du kannst Whatsapp-Anrufe tätigen und dabei entscheiden ob es ein normaler Anruf oder ein Videoanruf sein soll. Wir empfehlen dir Videoanrufe um dem Kunden z.B. das Angebot in  deinem Geschäft direkt zu zeigen. Am besten vollendest du dein Whatsapp Profil mit einem schönen Foto deines Geschäfts oder deines Logos damit die Kunden sofort erkennen mit wem sie in Kontakt sind. Die Vorteile sind hier natürlich, dass es kostenlos ist und du lediglich eine stabile Internetverbindung brauchst um kontaktiert zu werden.',
                        'Nebst Whatsapp gibt es auch weitere Optionen um deine Kunden mittels Videochat zu beraten. Zum Beispiel bietet hier Zoom oder auch FaceTime eine tolle Möglichkeit, um mit den Kunden via Video in Echtzeit zu sprechen und auf ihre Bedürfnisse und Fragen einzugehen.',
                        'Zusatztipp: Nachdem du die ersten Beratungstermine mit den Kunden vereinbart hast, empfehlen wir dir die Einrichtung eines Terminkalenders damit du die Übersicht über deine Beratungstermine nicht verlierst (z.B. mit Calendly).'
                    ]}
                    img={"/img/illus/illu-whatever.svg"}
                    
                />

                <ContentBox
                    title="Die ersten Bestellungen sind schon da, wie geht es jetzt weiter?"
                    text={[
                        'Wenn die Bestellungen abgeholt werden ist es wichtig, dass du den nötigen Abstand wahrst und der Kunde (sofern dies bei dir möglich ist) kontaktlos zahlt. Auf diese Weise trägst du auch zur allgemeinen Gesundheit bei. Am besten hast du die Bestellung schon vorbereitet und Verpackt sodass der Kunde oder die Kundin einfach vorbeikommen ggf. noch zahlt (sofern dies noch nicht online gemacht wurde) und die Bestellung abholen.',
                        'Auch bei einer Lieferung solltest du auf den nötigen Abstand achten und von zu engem Kontakt absehen. Hier empfehlen wir dir, beim Kunden zu läuten, die Bestellung vor die Haustür zu legen und anschliessend ein paar Schritte zurückzutreten. Wenn noch bezahlt werden muss, empfehle dem Kunden bei Bestellaufgebung das Geld (sofern bar bezahlt wird) möglichst passend in ein Couvert zu legen welches er dann ebenfalls hinlegen kann. Sobald du und der Kunde das OK gegeben habt, dass alles in Ordnung ist kannst du dich wieder verabschieden und dich zu deinem nächsten Auftrag oder Bestellung aufmachen.',
                    ]}
                    img={"/img/illus/illu-what.svg"}
                />

                <ContentBox
                    title="Du bietest noch keine Heimlieferung an, bist es dir jedoch am Überlegen?"
                    text={[
                        'Wenn du dir überlegst neu auch Bestellungen zu den Kunden zu liefern und du dies bisher noch nicht gemacht hast hier ein paar Ideen, um etwas in die Wege zu leiten',
                        'Velokurier: Wenn es schnell gehen muss empfehlen wir dir dich nach Velokurieren in deiner Region umzuschauen. Diese sind oftmals relativ günstig und schnell verfügbar.',
                        'Kennst du Studenten oder Schüler die im Moment gelangweilt sind? Dann frage doch diese an, ob sie Interesse daran hätten für dich kurze Einsätze für Lieferungen zu machen. Am besten hängst du eine Flyer mit deiner Handynummer auf damit sie auf dich zukommen können. Hier ist es wichtig, die Personen für die Lieferung richtig zu instruieren damit sie sich an die Abstands- und Hygieneregeln halten.',
                        'Soll eine Lieferung weiter weg verschickt werden? Dann empfehlen wir die Lieferung mit der Post. Hier kannst du dein Paket einfach aufgeben und schweizweit versenden.',
                    ]}
                    img={"/img/illus/illu-smile-big.svg"}
                />
            </div>
        </section>

    </Stacked>
);