module TodosHelper
  def format_date_header(date)
    case date
    when Date.current
      "Today"
    when Date.current - 1.day
      "Yesterday"
    when (Date.current - 6.days)..Date.current
      date.strftime("%A") # Day of the week
    else
      date.strftime("%B %d, %Y") # Full date format
    end
  end
end
