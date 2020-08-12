<template>
  <section class="section">
    <div class="container">
      <h4 class="title is-4">
        FAQs
      </h4>
      <section>
        <h5 class="title is-5">
          General Questions
        </h5>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How can I contact Skillzzbox?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Please contact us through hello@skillzzbox.com or the contact form.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How does the payment system work?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              All payments are processed via PayPal to insure maximum safety. At the moment of
              booking, the money transaction will take place.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How long is a lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              A lesson is 45 minutes.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What currency do you use?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              All transactions are in U.S. dollars (USD). Please check with your bank or other
              payment instate if any fee applies.
            </div>
          </div>
        </b-collapse>
      </section>
      <section>
        <h5 class="title is-5 -is-spaced-top">
          Questions for Teachers
        </h5>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What are the requisites I need to teach at Skillzzbox?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              You can use all common electronic devices for teaching with Skillzzbox, such as
              laptop, computer, mobile phone or tablet, a good internet connection and a webcam
              and microphone (we recommend headphones). Additionally, you need a Zoom ID, as
              the video lesson will be done through Zoom (Please go to zoom.us for further
              information). Additionally you require a PayPal account.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Do I need any certificates as a language teacher for teaching at Skillzzbox?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              No, no teaching certificate is required to teaching at Skillzzbox. The rating and
              comment functions ensure a high transparency on quality. Good teachers can easily be
              identified, no matter she/he is holder of a certificate or not.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How does teaching with Skillzzbox work?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Skillzzbox is a platform which connects teachers and students all over the world. All
              lessons are booked and paid through the platform. As a teacher, you create an
              account and a profile where you offer language teaching at your conditions. Students
              will then book you through the platform. The language lesson itself will be hold in a
              virtual classroom through Zoom (please visit zoom.us for further information).
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What do I do if my student misses the lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              If the student does not join the lesson within 20 minutes of the scheduled hour, you
              can close the session and will still be paid out for the whole lesson. If she/he joins
              within the first 20 minutes, please hold the remaining part of the lesson. The lesson
              still finishes as booked, the student has no right to be taught for the missed time.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What happens if I miss my lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              If you miss your lesson, the student will be refunded. Please be aware that you have
              to pay a fix fee of USD 10 for the inconveniences (please find the relevant
              information on the pricing terms). If you are late and the students accepts to still run
              the lesson, you will have to teach the whole booked time (45 mintues).
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Can I reschedule a lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              No.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Is there a minimum and maximum rate for the lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Yes. The minimum fee for a lesson is USD 5. Except of this limitation you are free to
              set your price per lesson. Please be aware that there are commissions and charges
              you need to pay to Skillzzbox and to payments services according to the pricing
              terms.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How can I share my screen?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Please use this
              <a href="https://support.zoom.us/hc/en-us/articles/203727929-Screen-Sharing-with-Zoom-Rooms?mobile_site=true" target="_blank">
                instruction
              </a>
              from Zoom for further information.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Where do I find my Zoom ID
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Please use this
              <a
                href="https://support.zoom.us/hc/en-us/articles/201362843-What-is-Personal-Meeting-ID-PMI-and-Personal-Link-?mobile_site=true"
                target="_blank"
              >
                Instruction
              </a>
              from Zoom for further information.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Do I get a form stating my lessons for the tax authority?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              No, Skillzzbox will not issue any forms for your income declaration. You are solely
              responsible for your records. Please consult your local tax expert for any further
              questions.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How often does Skillzzbox pay out?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Skillzzbox pays out on a regular basis which will be twice a month. Payments are
              processed through PayPal. So ensure to keep your Paypal account updated.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How do I set up a lesson in Zoom?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Before the lesson can be held in Zoom, the teacher must schedule it in Zoom. For this,
              you need to log in to your Zoom account. In the main menu, you choose “Schedule a meeting”.
              Then you add the topic and the description for the class (optional). Choose the correct
              date and time for the booked lesson. The duration for a lesson is 45 minutes. The time zone
              is according to your chosen time zone in your Skillzzbox profile.
              <strong>
                IMPORTANT: for the
                Meeting ID choose the “Personal Meeting ID”.
              </strong>
              Otherwise the student is not able to join the lesson.
              For the video options choose “on” so you can see each other.
            </div>
          </div>
        </b-collapse>
      </section>
      <!-- Questions for students-->
      <section>
        <h5 class="title is-5 -is-spaced-top">
          Questions for Students
        </h5>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Which time zone do the booked lessons correspond?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              <!-- Skillzzbox uses the time zone you select in your settings. The schedule is
              automatically converted into your time zone saved in your profile. -->
              The lesson times indicated in the booking process are converted to your time zone.
              After the booking, you will receive the booking confirmation with an entry for your calendar.
              This entry is already converted to your time zone. No action is required from your side even
              though your language teacher might be in a different time zone. All booking conversions are
              shown in real-time during your booking process.

              <!-- The lesson times indicated in the booking process correspond to the time zone
              of the selected teacher. The teacher times are shown during the booking process
              at the top of the page. After the booking you will receive the booking confirmation
              with an entry for your calendar. This entry converts the booked time into your time zone. -->
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What are the technical requisites that I need to attend lessons through Skillzzbox?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              You can use all common electronic devices with Skillzzbox, such as laptops,
              computers, mobile phones or tablets, a good internet connection and a webcam and
              microphone (we recommend headphones). Additionally, you need a Zoom ID, as the
              video lesson will be done through Zoom (Please go to zoom.com for further
              information about it).
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Can I reschedule my lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              No.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What happens if I do not show up on the scheduled lesson?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              In any case, you will be charged for the lesson (no refund possible). The teacher will
              wait for a maximum of 20 minutes, where you can still join the lesson and use the
              remaining time of the booked class. In case you do not show up within the first 20
              minutes, the teacher will close the lesson and will still be paid for it.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              Why don’t you offer 20- or 30-minutes trial lessons?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Language learning takes time and we are convinced that it needs at least an hour to
              know to decide if you do not want to continue. We recommend that you only book one
              lesson for the first time with a new teacher and only after that book several hours at
              once. Additionally the rating and comment functions will help you to find the right
              teacher.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              How can I cancel my bookings?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Lessons cannot be cancelled.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What happens if the teacher does not show up?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              If the teacher is not in the class room within 5 minutes after the starting time, you can contact
              Skillzzbox support within 2 days by using the contact form. Skillzzbox refunds the payment
              for the class after consulting the teacher. Charged PayPal fees for the refund are at the
              expanses of the student. In case of disagreements print screens from the virtual class room
              incl. a time stamp helps. So we recommend you to make print screens in case the teacher
              does not show up.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              What happens if the teacher is not offering courses anymore but I still have some bookings
              with him/her?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Those lessons are treated as no-shows of the teacher and are refunded.
            </div>
          </div>
        </b-collapse>
        <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
          <div
            slot="trigger"
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">
              The language I would like to learn is not listed. Why?
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              Teachers can choose any language they wish to teach, but as a student you only find
              the languages which do have at least one teacher offering it. This is for your
              convenience.
            </div>
          </div>
        </b-collapse>
      </section>
    </div>
  </section>
</template>
