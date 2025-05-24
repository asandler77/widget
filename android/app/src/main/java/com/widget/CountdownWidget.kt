package com.widget

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.os.SystemClock
import android.widget.RemoteViews
import com.widget.R
import java.text.SimpleDateFormat
import java.util.*
import com.tencent.mmkv.MMKV
import android.util.Log

class CountdownWidget : AppWidgetProvider() {

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        MMKV.initialize(context)
        val mmkv = MMKV.defaultMMKV()
        val dateString = mmkv.decodeString("widget_end_time")

        val targetDate = if (dateString != null) {
            try {
                SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault()).parse(dateString)
            } catch (e: Exception) {
                Log.e("CountdownWidget", "Дата в MMKV не читается: $dateString")
                null
            }
        } else {
            Log.w("CountdownWidget", "Дата не найдена в MMKV, используется по умолчанию")
            Calendar.getInstance().apply {
                set(2025, Calendar.JUNE, 1, 0, 0, 0)
            }.time
        }

        if (targetDate != null) {
            for (appWidgetId in appWidgetIds) {
                updateWidget(context, appWidgetManager, appWidgetId, targetDate)
            }
        }

        // 🔁 Настройка AlarmManager на обновление каждые 5 секунд
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, CountdownWidget::class.java)
        intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)

        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        alarmManager.setRepeating(
            AlarmManager.ELAPSED_REALTIME_WAKEUP,
            SystemClock.elapsedRealtime() + 5000,
            5000,
            pendingIntent
        )
    }

    override fun onDisabled(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, CountdownWidget::class.java)
        val pendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        alarmManager.cancel(pendingIntent)
    }

    private fun updateWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int,
        targetDate: Date
    ) {
        val views = RemoteViews(context.packageName, R.layout.countdown_widget)

        val now = Date()
        val diff = targetDate.time - now.time

        val days = diff / (1000 * 60 * 60 * 24)
        val hours = (diff / (1000 * 60 * 60)) % 24
        val minutes = (diff / (1000 * 60)) % 60
        val seconds = (diff / 1000) % 60

        val countdownText = "$days дн $hours ч $minutes м $seconds с"
        views.setTextViewText(R.id.countdown_text, countdownText)

        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}
